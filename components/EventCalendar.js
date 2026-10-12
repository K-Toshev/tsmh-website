'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

export default function EventCalendar({ events }) {
  return (
    <div className="card overflow-hidden">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }}
        height={650}
        events={events}
        eventDisplay="block"
        eventTimeFormat={{ hour: 'numeric', minute: '2-digit' }}
      />
    </div>
  );
}
