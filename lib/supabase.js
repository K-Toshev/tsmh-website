import { createClient } from '@supabase/supabase-js';

export const supabaseConfigError =
  'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.';

function getSupabaseCredentials() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  };
}

export function createBrowserSupabaseClient() {
  const { url, anonKey } = getSupabaseCredentials();

  if (!url || !anonKey) {
    return null;
  }

  return createClient(url, anonKey);
}

export async function getPublicEvents() {
  const { url, anonKey } = getSupabaseCredentials();

  if (!url || !anonKey) {
    return { events: [], error: supabaseConfigError };
  }

  const client = createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  });

  const { data, error } = await client
    .from('events')
    .select('id, title, starts_at, ends_at, location, summary')
    .order('starts_at', { ascending: true });

  if (error) {
    return { events: [], error: `Unable to load events: ${error.message}` };
  }

  return {
    events: data.map((event) => ({
      id: event.id,
      title: event.title,
      start: event.starts_at,
      ...(event.ends_at ? { end: event.ends_at } : {}),
      extendedProps: {
        location: event.location,
        summary: event.summary
      }
    })),
    error: null
  };
}
