'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import EventCalendar from '@/components/EventCalendar';
import { createBrowserSupabaseClient, supabaseConfigError } from '@/lib/supabase';

const emptyDraft = {
  id: null,
  title: '',
  start: '',
  end: '',
  location: '',
  summary: ''
};

function toLocalInputValue(value) {
  if (!value) return '';
  const date = new Date(value);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}

function toCalendarEvent(event) {
  return {
    id: event.id,
    title: event.title,
    start: event.starts_at,
    ...(event.ends_at ? { end: event.ends_at } : {}),
    extendedProps: {
      location: event.location,
      summary: event.summary
    }
  };
}

export default function AdminPage() {
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [events, setEvents] = useState([]);
  const [draft, setDraft] = useState(emptyDraft);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!supabase) {
      setAuthReady(true);
      setError(supabaseConfigError);
      return undefined;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthReady(true);
      setError('');
      setMessage('');
    });

    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (sessionError) {
        setError(`Unable to check sign-in status: ${sessionError.message}`);
      }
      setUser(data.session?.user ?? null);
      setAuthReady(true);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const loadEvents = useCallback(async () => {
    if (!supabase) return;

    const { data, error: loadError } = await supabase
      .from('events')
      .select('id, title, starts_at, ends_at, location, summary')
      .order('starts_at', { ascending: true });

    if (loadError) {
      setError(`Unable to load events: ${loadError.message}`);
      return;
    }

    setEvents(data.map(toCalendarEvent));
  }, [supabase]);

  useEffect(() => {
    let cancelled = false;

    async function checkAdminAccess() {
      setIsAdmin(false);
      setEvents([]);
      if (!user || !supabase) return;

      const { data, error: adminError } = await supabase
        .from('event_admins')
        .select('user_id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (cancelled) return;
      if (adminError) {
        setError(`Unable to verify admin access: ${adminError.message}`);
        return;
      }

      if (!data) {
        setMessage('This account is signed in but is not authorized to manage events.');
        return;
      }

      setIsAdmin(true);
      await loadEvents();
    }

    checkAdminAccess();
    return () => {
      cancelled = true;
    };
  }, [loadEvents, supabase, user]);

  async function handleLogin(event) {
    event.preventDefault();
    if (!supabase) {
      setError(supabaseConfigError);
      return;
    }

    setBusy(true);
    setError('');
    setMessage('');
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);

    if (loginError) {
      setError(`Sign-in failed: ${loginError.message}`);
    }
  }

  async function handleLogout() {
    if (!supabase) return;

    const { error: logoutError } = await supabase.auth.signOut();
    if (logoutError) {
      setError(`Unable to sign out: ${logoutError.message}`);
      return;
    }
    setDraft(emptyDraft);
    setMessage('');
  }

  function selectEvent(event) {
    setDraft({
      id: event.id,
      title: event.title,
      start: toLocalInputValue(event.start),
      end: toLocalInputValue(event.end),
      location: event.extendedProps.location ?? '',
      summary: event.extendedProps.summary ?? ''
    });
    setError('');
    setMessage('');
  }

  async function handleSave(event) {
    event.preventDefault();
    if (!supabase || !isAdmin) return;

    setBusy(true);
    setError('');
    setMessage('');
    const values = {
      title: draft.title.trim(),
      starts_at: new Date(draft.start).toISOString(),
      ends_at: draft.end ? new Date(draft.end).toISOString() : null,
      location: draft.location.trim(),
      summary: draft.summary.trim()
    };

    const query = draft.id
      ? supabase.from('events').update(values).eq('id', draft.id)
      : supabase.from('events').insert(values);
    const { data, error: saveError } = await query
      .select('id, title, starts_at, ends_at, location, summary')
      .single();
    setBusy(false);

    if (saveError) {
      setError(`Unable to save event: ${saveError.message}`);
      return;
    }

    const savedEvent = toCalendarEvent(data);
    setEvents((current) => {
      const updated = current.filter((item) => item.id !== savedEvent.id);
      return [...updated, savedEvent].sort((a, b) => new Date(a.start) - new Date(b.start));
    });
    setDraft({
      id: savedEvent.id,
      title: savedEvent.title,
      start: toLocalInputValue(savedEvent.start),
      end: toLocalInputValue(savedEvent.end),
      location: savedEvent.extendedProps.location,
      summary: savedEvent.extendedProps.summary
    });
    setMessage('Event saved.');
  }

  async function handleDelete() {
    if (!supabase || !isAdmin || !draft.id) return;
    if (!window.confirm('Delete this event? This cannot be undone.')) return;

    setBusy(true);
    setError('');
    setMessage('');
    const { error: deleteError } = await supabase.from('events').delete().eq('id', draft.id);
    setBusy(false);

    if (deleteError) {
      setError(`Unable to delete event: ${deleteError.message}`);
      return;
    }

    setEvents((current) => current.filter((item) => item.id !== draft.id));
    setDraft(emptyDraft);
    setMessage('Event deleted.');
  }

  if (!authReady) {
    return <main className="section-shell"><p className="card">Checking sign-in status…</p></main>;
  }

  if (!user || !isAdmin) {
    return (
      <main className="section-shell">
        <div className="mx-auto max-w-lg card">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-700">Admin login</p>
          <h1 className="mt-3 text-4xl font-bold text-brand-900">Sign in to manage the calendar</h1>
          {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-red-800">{error}</p>}
          {message && <p role="status" className="mt-5 rounded-xl bg-amber-50 p-4 text-amber-900">{message}</p>}
          {!user && (
            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <div>
                <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-stone-700">Email</label>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-brand-700"
                />
              </div>
              <div>
                <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-stone-700">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-brand-700"
                />
              </div>
              <button disabled={busy || !supabase} type="submit" className="link-pill w-full justify-center disabled:opacity-60">
                {busy ? 'Signing in…' : 'Log in'}
              </button>
            </form>
          )}
          {user && (
            <button type="button" onClick={handleLogout} className="link-pill mt-5">
              Sign out
            </button>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="section-shell space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-700">Admin dashboard</p>
          <h1 className="mt-3 text-4xl font-bold text-brand-900">Manage meeting calendar</h1>
          <p className="mt-2 text-stone-700">Signed in as {user.email}</p>
        </div>
        <button type="button" onClick={handleLogout} className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-brand-800 hover:border-brand-700">
          Sign out
        </button>
      </div>

      {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-800">{error}</p>}
      {message && <p role="status" className="rounded-xl bg-green-50 p-4 text-green-800">{message}</p>}

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-6">
          <EventCalendar events={events} />
          <section className="card">
            <h2 className="text-xl font-bold text-brand-900">Select an event to edit</h2>
            {events.length ? (
              <ul className="mt-4 divide-y divide-stone-200">
                {events.map((event) => (
                  <li key={event.id}>
                    <button
                      type="button"
                      onClick={() => selectEvent(event)}
                      className="w-full py-3 text-left hover:text-brand-700"
                    >
                      <span className="block font-semibold">{event.title}</span>
                      <span className="mt-1 block text-sm text-stone-600">
                        {new Date(event.start).toLocaleString()}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-stone-600">No events have been created yet.</p>
            )}
          </section>
        </div>

        <form onSubmit={handleSave} className="card space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-brand-900">{draft.id ? 'Edit event' : 'Add event'}</h2>
            <button
              type="button"
              onClick={() => { setDraft(emptyDraft); setError(''); setMessage(''); }}
              className="text-sm font-medium text-brand-700 hover:text-brand-900"
            >
              New event
            </button>
          </div>
          <div>
            <label htmlFor="event-title" className="mb-2 block text-sm font-medium text-stone-700">Title</label>
            <input
              id="event-title"
              required
              value={draft.title}
              onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-brand-700"
            />
          </div>
          <div>
            <label htmlFor="event-location" className="mb-2 block text-sm font-medium text-stone-700">Location</label>
            <input
              id="event-location"
              value={draft.location}
              onChange={(event) => setDraft((current) => ({ ...current, location: event.target.value }))}
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-brand-700"
            />
          </div>
          <div>
            <label htmlFor="event-start" className="mb-2 block text-sm font-medium text-stone-700">Start</label>
            <input
              id="event-start"
              type="datetime-local"
              required
              value={draft.start}
              onChange={(event) => setDraft((current) => ({ ...current, start: event.target.value }))}
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-brand-700"
            />
          </div>
          <div>
            <label htmlFor="event-end" className="mb-2 block text-sm font-medium text-stone-700">End (optional)</label>
            <input
              id="event-end"
              type="datetime-local"
              value={draft.end}
              onChange={(event) => setDraft((current) => ({ ...current, end: event.target.value }))}
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-brand-700"
            />
          </div>
          <div>
            <label htmlFor="event-summary" className="mb-2 block text-sm font-medium text-stone-700">Summary</label>
            <textarea
              id="event-summary"
              rows={4}
              value={draft.summary}
              onChange={(event) => setDraft((current) => ({ ...current, summary: event.target.value }))}
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-brand-700"
            />
          </div>
          <div className="flex gap-3">
            <button disabled={busy} type="submit" className="link-pill flex-1 justify-center disabled:opacity-60">
              {busy ? 'Saving…' : 'Save event'}
            </button>
            {draft.id && (
              <button
                disabled={busy}
                type="button"
                onClick={handleDelete}
                className="rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
