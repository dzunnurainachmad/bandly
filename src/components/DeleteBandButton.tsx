'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Trash2 } from 'lucide-react'
import { deleteBand } from '@/lib/queries'
import { Button } from '@/components/ui/Button'

interface Props {
  bandId: string
  bandName: string
  redirectTo?: string
}

export function DeleteBandButton({ bandId, bandName, redirectTo = '/dashboard' }: Props) {
  const router = useRouter()
  const [confirm, setConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const t = useTranslations('deleteBand')

  async function handleDelete() {
    setLoading(true)
    try {
      await deleteBand(bandId)
      router.push(redirectTo)
      router.refresh()
    } catch {
      setLoading(false)
      setConfirm(false)
    }
  }

  if (confirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-stone-500 dark:text-stone-400">{t('confirm', { name: bandName })}</span>
        <Button variant="danger" size="sm" onClick={handleDelete} loading={loading}>
          {loading ? t('deleting') : t('yes')}
        </Button>
        <Button variant="secondary" size="sm" onClick={() => setConfirm(false)}>
          {t('cancel')}
        </Button>
      </div>
    )
  }

  return (
    <Button variant="danger-ghost" size="sm" onClick={() => setConfirm(true)}>
      <Trash2 className="w-4 h-4" />
      {t('button')}
    </Button>
  )
}
