import { createSupabaseServerClient } from '@/lib/supabase-server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function PATCH(req: Request) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { display_name, bio, avatar_url } = await req.json()

  const updates: Record<string, string | null> = {}
  if (display_name !== undefined) updates.display_name = display_name?.trim() || null
  if (bio !== undefined) updates.bio = bio?.trim() || null
  if (avatar_url !== undefined) updates.avatar_url = avatar_url || null

  const { error } = await supabaseAdmin
    .from('profiles')
    .update(updates)
    .eq('id', user.id)

  if (error) return Response.json({ error: error.message }, { status: 500 })

  return Response.json({ ok: true })
}
