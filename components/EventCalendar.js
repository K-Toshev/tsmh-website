"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { toDateTime } from "@/lib/dates";

// Shared calendar used on both the public page and the admin page.
// Pass onDateClick only where clicking an empty day should do something (admin).
export default function EventCalendar({ events, onEventClick, onDateClick }) {
  const items = events.map((e) => ({
    id: e.id,
    title: e.title,
    start: toDateTime(e.date, e.time),
  }));

  return (
    <div className="bg-surface border border-line rounded-lg p-3 sm:p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        events={items}
        height="auto"
        eventClick={(info) => onEventClick?.(info.event.id)}
        dateClick={onDateClick ? (info) => onDateClick(info) : undefined}
      />
    </div>
  );
}
