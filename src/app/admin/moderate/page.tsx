import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/admin-queries'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getTranslations } from 'next-intl/server'
import { ModerationList } from './ModerationList'

export default async function ModeratePage() {
  if (!(await isAdmin())) redirect('/')

  const t = await getTranslations('moderate')

  const { data: flags } = await supabaseAdmin
    .from('band_flags')
    .select(`
      id, band_id, reason, status, created_at, moderation_result,
      band:bands_view(name, bio, photo_url, province_name)
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  // Normalize Supabase join shape (band may be array or object)
  const normalized = (flags ?? []).map((f) => ({
    ...f,
    band: Array.isArray(f.band) ? f.band[0] : f.band,
  }))

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">{t('title')}</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
          {t('subtitle')} — {t('awaitingReview', { n: normalized.length })}
        </p>
      </div>
      <ModerationList flags={normalized as Parameters<typeof ModerationList>[0]['flags']} />
    </div>
  )
}
