"use client";

import { useEffect, useState } from "react";
import EventCalendar from "@/components/EventCalendar";
import { supabase } from "@/lib/supabaseClient";
import { formatRange } from "@/lib/dates";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from("events").select("*").order("start_time");
      if (error) setError("Events could not be loaded. Check your Supabase keys and try again.");
      else setEvents(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Events</h1>
      <p className="text-muted mt-2">Select an event to see its details.</p>

      <div className="mt-6 space-y-4">
        {error && <p role="alert" className="text-danger text-sm">{error}</p>}
        {loading ? (
          <p className="text-muted text-sm">Loading events...</p>
        ) : (
          <EventCalendar
            events={events}
            onEventClick={(id) => setSelected(events.find((e) => e.id === id) || null)}
          />
        )}

        {selected && (
          <article className="bg-surface border border-line rounded-lg p-5">
            <div className="flex justify-between gap-4">
              <h2 className="font-semibold text-lg">{selected.title}</h2>
              <button onClick={() => setSelected(null)} className="text-sm text-muted hover:text-accent">
                Close
              </button>
            </div>
            <p className="text-sm text-accent font-medium mt-1">{formatRange(selected.start_time, selected.end_time)}</p>
            {selected.location && <p className="text-sm mt-2">{selected.location}</p>}
            {selected.description && <p className="text-sm text-muted mt-2 whitespace-pre-line">{selected.description}</p>}
          </article>
        )}
      </div>
    </div>
  );
}
