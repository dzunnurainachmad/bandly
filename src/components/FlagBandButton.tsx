'use client'

import { useState } from 'react'
import { Flag } from 'lucide-react'
import { TextArea } from '@/components/ui/TextArea'

export function FlagBandButton({ bandId }: { bandId: string }) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    setLoading(true)
    setError('')
    const res = await fetch('/api/flag-band', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ band_id: bandId, reason }),
    })
    setLoading(false)
    if (res.ok) {
      setDone(true)
      setOpen(false)
    } else {
      const body = await res.json()
      setError(body.error ?? 'Terjadi kesalahan')
    }
  }

  if (done) {
    return (
      <p className="text-xs text-stone-400 dark:text-stone-500">Laporan terkirim</p>
    )
  }

  return (
    <div>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-red-500 dark:text-stone-500 dark:hover:text-red-400 transition-colors"
        >
          <Flag className="w-3 h-3" /> Laporkan
        </button>
      ) : (
        <div className="mt-2 space-y-2 p-3 border border-stone-200 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-800/50">
          <p className="text-xs font-medium text-stone-600 dark:text-stone-400">Alasan laporan (opsional)</p>
          <TextArea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={2}
            placeholder="Konten melanggar, band duplikat, dll."
            error={error || undefined}
            className="text-xs px-2 py-1.5"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="text-xs bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 disabled:opacity-60 transition-colors"
            >
              {loading ? 'Mengirim...' : 'Kirim Laporan'}
            </button>
            <button
              onClick={() => { setOpen(false); setError('') }}
              className="text-xs text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
