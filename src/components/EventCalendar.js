export default function EventCalendar() {
  return (
    <div className="card">
      <h2 className="text-xl font-semibold">Event calendar placeholder</h2>
      <p className="mt-3 text-slate-600">
        FullCalendar can be added here to display public events and club meetings.
      </p>
      <div className="mt-6 grid gap-4 border border-dashed border-slate-300 p-6 text-sm text-slate-500 md:grid-cols-7">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="rounded-lg bg-slate-100 p-4 text-center">
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
