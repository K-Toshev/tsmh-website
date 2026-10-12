// Date is stored as "YYYY-MM-DD" and time as "HH:MM:SS". These helpers make them readable.

// Combines them into one value FullCalendar understands.
export function toDateTime(date, time) {
  return `${date}T${time}`;
}

// "Monday, October 12, 2026"
export function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// "6:00 PM"
export function formatTime(time) {
  const [h, m] = time.split(":");
  const d = new Date();
  d.setHours(Number(h), Number(m), 0, 0);
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

// Today as "YYYY-MM-DD" in the viewer's local time.
export function today() {
  return new Date().toLocaleDateString("en-CA");
}
