import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const bandId = req.nextUrl.searchParams.get('band_id')

  if (bandId) {
    // Check if a specific band is saved
    const { data } = await supabase
      .from('saved_bands')
      .select('band_id')
      .eq('user_id', user.id)
      .eq('band_id', bandId)
      .maybeSingle()
    return NextResponse.json({ saved: !!data })
  }

  // Return all saved band IDs
  const { data, error } = await supabase
    .from('saved_bands')
    .select('band_id, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ saved: data })
}

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { band_id } = await req.json()
  if (!band_id) return NextResponse.json({ error: 'band_id required' }, { status: 400 })

  const { error } = await supabase
    .from('saved_bands')
    .insert({ user_id: user.id, band_id })

  if (error) {
    // Already saved — treat as success
    if (error.code === '23505') return NextResponse.json({ saved: true })
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ saved: true })
}

export async function DELETE(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { band_id } = await req.json()
  if (!band_id) return NextResponse.json({ error: 'band_id required' }, { status: 400 })

  const { error } = await supabase
    .from('saved_bands')
    .delete()
    .eq('user_id', user.id)
    .eq('band_id', band_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ saved: false })
}
