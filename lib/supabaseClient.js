import { createClient } from "@supabase/supabase-js";

// Placeholder fallbacks keep the build from crashing before you add real keys.
// Until .env.local is filled in, database requests will simply fail with an error message.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(url, key);
