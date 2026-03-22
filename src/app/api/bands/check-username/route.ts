import { createSupabaseServerClient } from '@/lib/supabase-server'
import { supabaseAdmin } from '@/lib/supabase-admin'

const USERNAME_RE = /^[a-z0-9_]{3,30}$/

export async function GET(req: Request) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username') ?? ''
  const bandId = searchParams.get('bandId') ?? ''

  if (!USERNAME_RE.test(username)) {
    return Response.json({ available: false, reason: 'format' })
  }

  const { data } = await supabaseAdmin
    .from('bands')
    .select('id')
    .eq('username', username)
    .single()

  // Available if not found, OR if it's the current band being edited
  const available = !data || data.id === bandId
  return Response.json({ available })
}
