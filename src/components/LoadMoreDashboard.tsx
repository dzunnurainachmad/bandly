'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Pencil } from 'lucide-react'
import { BandCard } from './BandCard'
import { CardSkeleton } from './ui/Skeleton'
import type { Band } from '@/types'

interface Props {
  initialBands: Band[]
  initialHasMore: boolean
}

export function LoadMoreDashboard({ initialBands, initialHasMore }: Props) {
  const [bands, setBands] = useState(initialBands)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [loading, setLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(async () => {
    const nextPage = page + 1
    setLoading(true)
    try {
      const res = await fetch(`/api/dashboard?page=${nextPage}`)
      const data = await res.json()
      setBands((prev) => [...prev, ...data.bands])
      setHasMore(data.hasMore)
      setPage(nextPage)
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, loading, loadMore])

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bands.map((band) => (
          <div key={band.id} className="relative group/card flex flex-col">
            <BandCard band={band} />
            <Link
              href={`/bands/${band.id}/edit`}
              className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 hover:bg-black/80 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity"
            >
              <Pencil className="w-3 h-3" /> Edit
            </Link>
          </div>
        ))}
        {loading && Array.from({ length: 3 }).map((_, i) => (
          <CardSkeleton key={`skeleton-${i}`} />
        ))}
      </div>

      <div ref={sentinelRef} />
    </>
  )
}
