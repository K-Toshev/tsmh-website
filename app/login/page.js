"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Email or password is incorrect.");
      setBusy(false);
      return;
    }
    router.push("/admin");
  }

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-3xl font-bold tracking-tight">Admin login</h1>
      <p className="text-muted mt-2 text-sm">For club officers who manage events.</p>

      <form onSubmit={handleSubmit} className="mt-6 bg-surface border border-line rounded-lg p-5 space-y-4">
        <label className="block text-sm font-medium">
          Email
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-line rounded-md px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium">
          Password
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-line rounded-md px-3 py-2 text-sm"
          />
        </label>
        {error && <p role="alert" className="text-sm text-danger">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full bg-accent text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-accent-dark disabled:opacity-60"
        >
          {busy ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
