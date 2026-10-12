"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EventCalendar from "@/components/EventCalendar";
import EventForm from "@/components/EventForm";
import { supabase } from "@/lib/supabaseClient";
import { today } from "@/lib/dates";

export default function AdminPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState(null); // an event, a new draft, or null
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadEvents = useCallback(async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date")
      .order("time");
    if (error) setMessage("Events could not be loaded.");
    else setEvents(data);
  }, []);

  // Must be signed in to see this page. (The database also refuses edits from
  // anyone who isn't signed in, so this check is just for a friendly redirect.)
  useEffect(() => {
    async function check() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return router.replace("/login");
      setReady(true);
      loadEvents();
    }
    check();
  }, [router, loadEvents]);

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  function handleDateClick(info) {
    // dateStr is "YYYY-MM-DD" in month view, or "YYYY-MM-DDTHH:MM:SS..." in week view
    const date = info.dateStr.slice(0, 10);
    const time = info.dateStr.length > 10 ? info.dateStr.slice(11, 16) : "18:00";
    setMessage("");
    setEditing({ date, time });
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

    if (error) return setMessage("Could not save the event. Try signing out and back in.");
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

  if (!ready) return <p className="text-muted text-sm">Checking your access...</p>;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage events</h1>
          <p className="text-muted mt-2 text-sm">Select a day to add an event, or select an event to edit it.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setEditing({ date: today(), time: "18:00" })}
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
            key={editing.id || `new-${editing.date}-${editing.time}`}
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
