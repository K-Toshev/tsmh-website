import { getPublicEvents } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = await getPublicEvents();

  if (result.error) {
    return Response.json({ error: result.error }, { status: 503 });
  }

  return Response.json({ events: result.events });
}
