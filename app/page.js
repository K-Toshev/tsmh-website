import Link from 'next/link';
import { getPublicEvents } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { events, error } = await getPublicEvents();
  const nextMeeting = events.find((event) => new Date(event.start) >= new Date());

  return (
    <main>
      <section className="section-shell grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">Student organization</p>
          <h1 className="max-w-xl text-4xl font-bold tracking-tight text-brand-900 md:text-6xl">
            Discover the stories, strategy, and consequences of war.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-stone-700">
            The Thucydides Society for Military History brings together students who are curious about the people,
            campaigns, and ideas that shaped the conduct of conflict across time.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/calendar" className="link-pill">View upcoming events</Link>
            <Link href="/resources" className="inline-flex items-center rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-brand-800 transition hover:border-brand-700 hover:text-brand-900">
              Learn with us
            </Link>
          </div>
        </div>

        <div className="card flex flex-col justify-center gap-4 bg-brand-800 text-stone-50">
          <div className="flex items-center gap-4">
            <div className="logo-mark border-brand-200 bg-brand-700 text-brand-50">TSMH</div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-stone-300">Mission</p>
              <h2 className="text-2xl font-bold">Study the past to engage the present.</h2>
            </div>
          </div>
          <p className="text-stone-200">
            We foster historical inquiry, critical debate, and public understanding of military history through lectures,
            reading groups, and collaborative scholarship.
          </p>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 md:grid-cols-3">
          <article className="card">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Mission</p>
            <h3 className="mt-4 text-2xl font-bold text-brand-900">Scholarship & community</h3>
            <p className="mt-3 text-stone-700">
              We cultivate an interdisciplinary culture of historical interpretation, from campaign planning to social history.
            </p>
          </article>
          <article className="card">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Focus</p>
            <h3 className="mt-4 text-2xl font-bold text-brand-900">Research & discussion</h3>
            <p className="mt-3 text-stone-700">
              Members strengthen their analytical skills through reading groups, guest talks, and curator-led events.
            </p>
          </article>
          <article className="card">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Impact</p>
            <h3 className="mt-4 text-2xl font-bold text-brand-900">Public engagement</h3>
            <p className="mt-3 text-stone-700">
              We connect students with ideas that matter beyond the classroom and encourage serious historical dialogue.
            </p>
          </article>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="card bg-stone-900 text-stone-100">
          {error ? (
            <p role="alert" className="text-amber-200">{error}</p>
          ) : nextMeeting ? (
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-400">Next meeting</p>
                <h2 className="mt-2 text-3xl font-bold">{nextMeeting.title}</h2>
                <p className="mt-3 max-w-2xl text-stone-300">{nextMeeting.extendedProps.summary}</p>
              </div>
              <div className="rounded-2xl border border-stone-700 bg-stone-800 px-5 py-4">
                <p className="text-sm uppercase tracking-[0.2em] text-stone-400">When</p>
                <p className="mt-2 text-xl font-semibold">{new Date(nextMeeting.start).toLocaleString()}</p>
                <p className="mt-1 text-stone-300">{nextMeeting.extendedProps.location}</p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-400">Next meeting</p>
              <h2 className="mt-2 text-3xl font-bold">No upcoming meeting is scheduled</h2>
              <p className="mt-3 text-stone-300">Check the calendar again soon for new events.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
