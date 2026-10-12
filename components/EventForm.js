"use client";

import { useState } from "react";
import { toLocalInput, fromLocalInput } from "@/lib/dates";

const inputClass =
  "w-full border border-line rounded-md px-3 py-2 text-sm bg-surface focus:border-accent";

// `event` is either an existing event (has an id) or a blank draft with a start_time.
export default function EventForm({ event, onSave, onDelete, onCancel, saving }) {
  const [title, setTitle] = useState(event.title || "");
  const [location, setLocation] = useState(event.location || "");
  const [description, setDescription] = useState(event.description || "");
  const [start, setStart] = useState(toLocalInput(event.start_time));
  const [end, setEnd] = useState(toLocalInput(event.end_time));
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return setError("Enter a title.");
    if (!start) return setError("Choose a start time.");
    if (end && new Date(end) <= new Date(start)) return setError("The end time must be after the start time.");
    setError("");
    onSave({
      title: title.trim(),
      location: location.trim() || null,
      description: description.trim() || null,
      start_time: fromLocalInput(start),
      end_time: fromLocalInput(end),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface border border-line rounded-lg p-5 space-y-4">
      <h2 className="font-semibold text-lg">{event.id ? "Edit event" : "New event"}</h2>

      <label className="block text-sm font-medium">
        Title
        <input className={`${inputClass} mt-1`} value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Starts
          <input type="datetime-local" className={`${inputClass} mt-1`} value={start} onChange={(e) => setStart(e.target.value)} />
        </label>
        <label className="block text-sm font-medium">
          Ends (optional)
          <input type="datetime-local" className={`${inputClass} mt-1`} value={end} onChange={(e) => setEnd(e.target.value)} />
        </label>
      </div>

      <label className="block text-sm font-medium">
        Location
        <input className={`${inputClass} mt-1`} value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>

      <label className="block text-sm font-medium">
        Description
        <textarea rows={4} className={`${inputClass} mt-1`} value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>

      {error && <p role="alert" className="text-sm text-danger">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-accent text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-accent-dark disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save event"}
        </button>
        <button type="button" onClick={onCancel} className="text-sm font-medium px-4 py-2 rounded-md border border-line hover:border-accent">
          Cancel
        </button>
        {event.id && (
          <button
            type="button"
            onClick={onDelete}
            disabled={saving}
            className="text-sm font-medium px-4 py-2 rounded-md text-danger border border-line hover:border-danger sm:ml-auto"
          >
            Delete event
          </button>
        )}
      </div>
    </form>
  );
}
