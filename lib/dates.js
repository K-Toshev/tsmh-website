// Converts a stored timestamp into the "YYYY-MM-DDTHH:mm" format that <input type="datetime-local"> expects.
export function toLocalInput(value) {
  if (!value) return "";
  const d = new Date(value);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// Converts a datetime-local value back to an ISO timestamp for the database.
export function fromLocalInput(value) {
  return value ? new Date(value).toISOString() : null;
}

// Human-readable range, e.g. "Mon, Oct 12, 6:00 PM to 7:00 PM"
export function formatRange(start, end) {
  const s = new Date(start);
  const day = s.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  const time = (d) => d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  if (!end) return `${day}, ${time(s)}`;
  const e = new Date(end);
  if (s.toDateString() === e.toDateString()) return `${day}, ${time(s)} to ${time(e)}`;
  return `${day}, ${time(s)} to ${e.toLocaleDateString(undefined, { month: "short", day: "numeric" })}, ${time(e)}`;
}
