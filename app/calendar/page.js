import EventCalendar from '@/components/EventCalendar';
import { getPublicEvents } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function CalendarPage() {
  const { events, error } = await getPublicEvents();

  return (
    <main className="section-shell">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Calendar</p>
        <h1 className="mt-3 text-4xl font-bold text-brand-900">Upcoming meetings & events</h1>
      </div>
      {error ? (
        <p role="alert" className="card border-amber-300 bg-amber-50 text-amber-900">{error}</p>
      ) : events.length ? (
        <EventCalendar events={events} />
      ) : (
        <p className="card text-stone-700">There are no events scheduled yet.</p>
      )}
    </main>
  );
}
