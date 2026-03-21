import { getTranslations } from 'next-intl/server'
import { SubmitForm } from './SubmitForm'

export default async function SubmitPage() {
  const t = await getTranslations('submit')
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-2">{t('title')}</h1>
      <p className="text-stone-500 text-sm mb-8">{t('subtitle')}</p>
      <SubmitForm />
    </div>
  )
}
