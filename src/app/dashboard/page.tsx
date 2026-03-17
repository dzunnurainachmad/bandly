import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus, Music } from 'lucide-react'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { getUserBands } from '@/lib/queries'
import { LoadMoreDashboard } from '@/components/LoadMoreDashboard'

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login?next=/dashboard')

  const { bands, hasMore } = await getUserBands(user.id)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Dashboard</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">{user.email}</p>
        </div>
        <Link
          href="/submit"
          className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Daftarkan Band
        </Link>
      </div>

      {bands.length === 0 ? (
        <div className="text-center py-24 text-stone-400 dark:text-stone-500">
          <Music className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="font-medium">Belum ada band terdaftar</p>
          <p className="text-sm mt-1">
            <Link href="/submit" className="text-amber-600 hover:underline">
              Daftarkan band pertamamu
            </Link>
          </p>
        </div>
      ) : (
        <LoadMoreDashboard initialBands={bands} initialHasMore={hasMore} />
      )}
    </div>
  )
}
