import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCalendar from '@/components/EventCalendar';

export default function CalendarPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-500">Public calendar</p>
          <h1 className="mt-2 text-3xl font-bold">Upcoming events</h1>
        </div>

        <EventCalendar />
      </main>
      <Footer />
    </>
  );
}
