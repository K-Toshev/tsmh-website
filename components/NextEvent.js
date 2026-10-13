"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { formatDate, formatTime, today, toDateTime } from "@/lib/dates";

// Shows the soonest upcoming event from the database.
export default function NextEvent() {
  const [status, setStatus] = useState("loading"); // loading | ready | empty | error
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function load() {
      // Fetch a few events from today onward, then skip any that already started today.
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("date", today())
        .order("date")
        .order("time")
        .limit(10);

      if (error) return setStatus("error");

      const now = new Date();
      const next = data.find((e) => new Date(toDateTime(e.date, e.time)) >= now);
      if (next) {
        setEvent(next);
        setStatus("ready");
      } else {
        setStatus("empty");
      }
    }
    load();
  }, []);

  return (
    <section aria-labelledby="next-meeting-heading">
      <div className="bg-surface border border-line border-l-4 border-l-gold rounded-lg p-5 sm:p-6 min-h-32">
        <h2 id="next-meeting-heading" className="text-sm font-semibold uppercase tracking-wide text-accent">
          Next meeting
        </h2>

        {status === "loading" && <p className="text-sm text-muted mt-3">Loading...</p>}

        {status === "error" && (
          <p className="text-sm text-muted mt-3">
            Upcoming events are listed on the{" "}
            <Link href="/calendar" className="underline hover:text-accent">calendar page</Link>.
          </p>
        )}

        {status === "empty" && (
          <p className="text-sm text-muted mt-3">
            No upcoming events are scheduled yet. Check back soon.
          </p>
        )}

        {status === "ready" && (
          <div className="mt-3">
            <p className="text-xl font-semibold">{event.title}</p>
            <p className="text-sm font-medium mt-1">
              {formatDate(event.date)} at {formatTime(event.time)}
            </p>
            {event.location && <p className="text-sm text-muted mt-1">{event.location}</p>}
            {event.speaker && <p className="text-sm text-muted mt-1">Speaker: {event.speaker}</p>}
            {event.description && (
              <p className="text-sm text-muted mt-3 line-clamp-2 max-w-2xl">{event.description}</p>
            )}
          </div>
        )}

        {(status === "ready" || status === "empty") && (
          <Link href="/calendar" className="inline-block text-sm font-medium text-accent hover:text-accent-dark mt-4">
            View full calendar &rarr;
          </Link>
        )}
      </div>
    </section>
  );
}