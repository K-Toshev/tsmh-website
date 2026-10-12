"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EventCalendar from "@/components/EventCalendar";
import EventForm from "@/components/EventForm";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPage() {
  const router = useRouter();
  const [status, setStatus] = useState("checking"); // checking | ready | denied
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState(null); // an event, a new draft, or null
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadEvents = useCallback(async () => {
    const { data, error } = await supabase.from("events").select("*").order("start_time");
    if (error) setMessage("Events could not be loaded.");
    else setEvents(data);
  }, []);

  // Gate the page: must be signed in AND listed in the admins table.
  // (The database rules enforce this too, so this check is for a friendly UI only.)
  useEffect(() => {
    async function check() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return router.replace("/login");

      const { data: adminRow } = await supabase
        .from("admins")
        .select("user_id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (!adminRow) return setStatus("denied");
      setStatus("ready");
      loadEvents();
    }
    check();
  }, [router, loadEvents]);

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  function handleDateClick(info) {
    const start = new Date(info.date);
    if (info.allDay) start.setHours(18, 0, 0, 0); // default new events to 6 PM
    setMessage("");
    setEditing({ start_time: start.toISOString() });
  }

  function handleEventClick(id) {
    setMessage("");
    setEditing(events.find((e) => e.id === id) || null);
  }

  async function handleSave(values) {
    setSaving(true);
    const query = editing.id
      ? supabase.from("events").update(values).eq("id", editing.id)
      : supabase.from("events").insert(values);
    const { error } = await query;
    setSaving(false);

    if (error) return setMessage("Could not save the event. Make sure you are signed in as an admin.");
    setEditing(null);
    setMessage("Event saved.");
    loadEvents();
  }

  async function handleDelete() {
    if (!window.confirm(`Delete "${editing.title}"? This cannot be undone.`)) return;
    setSaving(true);
    const { error } = await supabase.from("events").delete().eq("id", editing.id);
    setSaving(false);

    if (error) return setMessage("Could not delete the event.");
    setEditing(null);
    setMessage("Event deleted.");
    loadEvents();
  }

  if (status === "checking") return <p className="text-muted text-sm">Checking your access...</p>;

  if (status === "denied") {
    return (
      <div className="max-w-md">
        <h1 className="text-2xl font-bold">No admin access</h1>
        <p className="text-muted mt-2 text-sm">
          This account is not on the admin list. Ask a current admin to add you, or sign in with a different account.
        </p>
        <button onClick={signOut} className="mt-4 border border-line text-sm font-medium px-4 py-2 rounded-md hover:border-accent">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage events</h1>
          <p className="text-muted mt-2 text-sm">Select a day to add an event, or select an event to edit it.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setEditing({ start_time: new Date().toISOString() })}
            className="bg-accent text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-accent-dark"
          >
            New event
          </button>
          <button onClick={signOut} className="border border-line text-sm font-medium px-4 py-2 rounded-md hover:border-accent">
            Sign out
          </button>
        </div>
      </div>

      {message && <p role="status" className="mt-4 text-sm text-accent-dark">{message}</p>}

      <div className="mt-6 space-y-6">
        {editing && (
          <EventForm
            key={editing.id || "new"}
            event={editing}
            saving={saving}
            onSave={handleSave}
            onDelete={handleDelete}
            onCancel={() => setEditing(null)}
          />
        )}
        <EventCalendar events={events} onEventClick={handleEventClick} onDateClick={handleDateClick} />
      </div>
    </div>
  );
}
