import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { getUserBands } from '@/lib/queries'

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ bands: [], hasMore: false }, { status: 401 })
  }

  const page = Number(request.nextUrl.searchParams.get('page') ?? '0')
  const { bands, hasMore } = await getUserBands(user.id, page)

  return NextResponse.json({ bands, hasMore })
}
