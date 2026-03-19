import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: Request) {
  const { band_id, route, input, output, rating } = await req.json()

  if (!route || !input || !output || !rating) {
    return Response.json({ error: 'Missing fields' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from('ai_feedback').insert({
    band_id: band_id ?? null,
    route,
    input,
    output,
    rating,
  })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ ok: true })
}
