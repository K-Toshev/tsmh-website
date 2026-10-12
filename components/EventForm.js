"use client";

import { useState } from "react";

const inputClass =
  "w-full border border-line rounded-md px-3 py-2 text-sm bg-surface focus:border-accent";

// `event` is either an existing event (has an id) or a blank draft with a date and time.
export default function EventForm({ event, onSave, onDelete, onCancel, saving }) {
  const [title, setTitle] = useState(event.title || "");
  const [speaker, setSpeaker] = useState(event.speaker || "");
  const [location, setLocation] = useState(event.location || "");
  const [description, setDescription] = useState(event.description || "");
  const [date, setDate] = useState(event.date || "");
  const [time, setTime] = useState(event.time ? event.time.slice(0, 5) : "18:00");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return setError("Enter a title.");
    if (!date) return setError("Choose a date.");
    if (!time) return setError("Choose a time.");
    setError("");
    onSave({
      title: title.trim(),
      speaker: speaker.trim() || null,
      location: location.trim() || null,
      description: description.trim() || null,
      date,
      time,
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
          Date
          <input type="date" className={`${inputClass} mt-1`} value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label className="block text-sm font-medium">
          Time
          <input type="time" className={`${inputClass} mt-1`} value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Speaker (optional)
          <input className={`${inputClass} mt-1`} value={speaker} onChange={(e) => setSpeaker(e.target.value)} />
        </label>
        <label className="block text-sm font-medium">
          Location
          <input className={`${inputClass} mt-1`} value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
      </div>

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
