'use client'

import { useEffect } from 'react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Terjadi Kesalahan
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
          Maaf, terjadi kesalahan saat memuat halaman ini.
        </p>
        <button
          onClick={reset}
          className="bg-amber-700 hover:bg-amber-800 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  )
}
