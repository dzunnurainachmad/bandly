import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Bookmark, Music } from 'lucide-react'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { supabase as publicSupabase } from '@/lib/supabase'
import { BandCard } from '@/components/BandCard'
import type { Band } from '@/types'

export default async function SavedBandsPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login?next=/saved')

  // Get saved band IDs ordered by save date
  const { data: savedRows } = await supabase
    .from('saved_bands')
    .select('band_id')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const bandIds = (savedRows ?? []).map((r) => r.band_id)

  let bands: Band[] = []
  if (bandIds.length > 0) {
    const { data } = await publicSupabase
      .from('bands_view')
      .select('*')
      .in('id', bandIds)
    // Preserve saved order
    const bandMap = new Map((data ?? []).map((b) => [b.id, b]))
    bands = bandIds.map((id) => bandMap.get(id)).filter(Boolean) as Band[]
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Bookmark className="w-6 h-6 text-amber-700" />
        <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">Band Tersimpan</h1>
      </div>

      {bands.length === 0 ? (
        <div className="text-center py-24 text-stone-400 dark:text-stone-500">
          <Music className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="font-medium">Belum ada band tersimpan</p>
          <p className="text-sm mt-1">
            <Link href="/browse" className="text-amber-600 hover:underline">
              Jelajahi band dan simpan yang kamu suka
            </Link>
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {bands.map((band) => (
            <BandCard key={band.id} band={band} />
          ))}
        </div>
      )}
    </div>
  )
}
