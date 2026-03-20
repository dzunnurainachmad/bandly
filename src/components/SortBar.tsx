'use client'

import { useRouter } from 'next/navigation'
import { Select } from '@/components/ui/Select'

const SORT_OPTIONS = [
  { value: 'updated_desc', label: 'Terbaru' },
  { value: 'updated_asc',  label: 'Terlama' },
  { value: 'name_asc',     label: 'Nama A–Z' },
  { value: 'name_desc',    label: 'Nama Z–A' },
]

interface SortBarProps {
  currentSort?: string
  total: number | null
  searchParams: { province?: string; city?: string; genre?: string; open?: string; q?: string; sort?: string }
}

export function SortBar({ currentSort, total, searchParams }: SortBarProps) {
  const router = useRouter()
  const active = currentSort || 'updated_desc'

  function buildUrl(sort: string) {
    const p = new URLSearchParams()
    if (searchParams.province) p.set('province', searchParams.province)
    if (searchParams.city)     p.set('city', searchParams.city)
    if (searchParams.genre)    p.set('genre', searchParams.genre)
    if (searchParams.open)     p.set('open', searchParams.open)
    if (searchParams.q)        p.set('q', searchParams.q)
    if (sort !== 'updated_desc') p.set('sort', sort)
    const qs = p.toString()
    return qs ? `/browse?${qs}` : '/browse'
  }

  return (
    <div className="flex items-center justify-between mb-4">
      <p className="text-sm text-stone-500 dark:text-stone-400">
        {total !== null ? <><span className="font-medium text-stone-700 dark:text-stone-200">{total}</span> band ditemukan</> : null}
      </p>
      <div className="flex items-center gap-2">
        <span className="text-xs text-stone-400 hidden sm:inline">Urutkan:</span>
        <div className="w-36">
          <Select
            value={active}
            options={SORT_OPTIONS}
            onChange={(val) => router.push(buildUrl(val || 'updated_desc'))}
          />
        </div>
      </div>
    </div>
  )
}
