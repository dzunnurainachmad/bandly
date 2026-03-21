'use client'

import { useState } from 'react'
import { Flag } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { TextArea } from '@/components/ui/TextArea'
import { Button } from '@/components/ui/Button'

export function FlagBandButton({ bandId }: { bandId: string }) {
  const t = useTranslations('flagBand')
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
      setError(body.error ?? t('genericError'))
    }
  }

  if (done) {
    return (
      <p className="text-xs text-stone-400 dark:text-stone-500">{t('done')}</p>
    )
  }

  return (
    <div>
      {!open ? (
        <Button
          variant="danger-ghost"
          size="sm"
          onClick={() => setOpen(true)}
          className="text-xs text-stone-400 dark:text-stone-500 hover:text-red-500 dark:hover:text-red-400"
        >
          <Flag className="w-3 h-3" /> {t('report')}
        </Button>
      ) : (
        <div className="mt-2 space-y-2 p-3 border border-stone-200 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-800/50">
          <p className="text-xs font-medium text-stone-600 dark:text-stone-400">{t('reasonLabel')}</p>
          <TextArea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={2}
            placeholder={t('reasonPlaceholder')}
            error={error || undefined}
            className="text-xs px-2 py-1.5"
          />
          <div className="flex gap-2">
            <Button variant="danger" size="sm" onClick={handleSubmit} loading={loading} className="text-xs">
              {loading ? t('submitting') : t('submit')}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { setOpen(false); setError('') }} className="text-xs">
              {t('cancel')}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
