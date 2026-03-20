import { notFound } from 'next/navigation'
import { Music } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getUserBands } from '@/lib/queries'
import { BandCard } from '@/components/BandCard'

interface Props {
  params: Promise<{ id: string }>
}

export default async function PublicProfilePage({ params }: Props) {
  const { id } = await params

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('id, display_name, bio, avatar_url, created_at')
    .eq('id', id)
    .single()

  if (!profile) notFound()

  const { bands } = await getUserBands(id)

  const displayName = profile.display_name ?? 'Pengguna'
  const initials = displayName.slice(0, 2).toUpperCase()

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Profile header */}
      <div className="flex items-center gap-5 mb-8">
        {profile.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.avatar_url}
            alt={displayName}
            className="w-20 h-20 rounded-full object-cover border-2 border-stone-200 dark:border-stone-700 shrink-0"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-400 flex items-center justify-center text-2xl font-bold shrink-0">
            {initials}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">{displayName}</h1>
          {profile.bio && (
            <p className="text-stone-500 dark:text-stone-400 mt-1 text-sm leading-relaxed">{profile.bio}</p>
          )}
        </div>
      </div>

      {/* Bands */}
      <h2 className="text-lg font-semibold text-stone-800 dark:text-stone-200 mb-4 flex items-center gap-2">
        <Music className="w-5 h-5 text-amber-600" />
        Band Terdaftar ({bands.length})
      </h2>

      {bands.length === 0 ? (
        <p className="text-stone-400 dark:text-stone-500 text-sm">Belum ada band terdaftar.</p>
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
