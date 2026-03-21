'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'
import { LOCALES, type Locale } from '@/i18n/config'

const LOCALE_LABELS: Record<Locale, string> = {
  id: 'Indonesia',
  en: 'English',
}

function getLocaleCookie(): Locale {
  const match = document.cookie.split('; ').find((c) => c.startsWith('NEXT_LOCALE='))
  const val = match?.split('=')[1]
  return LOCALES.includes(val as Locale) ? (val as Locale) : 'id'
}

export function LanguageSwitcher() {
  const t = useTranslations('settings')
  const router = useRouter()
  const [current, setCurrent] = useState<Locale>('id')

  useEffect(() => {
    setCurrent(getLocaleCookie())
  }, [])

  function handleChange(locale: Locale) {
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=${60 * 60 * 24 * 365}`
    setCurrent(locale)
    router.refresh()
  }

  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
        <Globe className="inline w-4 h-4 mr-1.5 opacity-70" />
        {t('languageLabel')}
      </label>
      <div className="flex gap-2">
        {LOCALES.map((locale) => (
          <button
            key={locale}
            type="button"
            onClick={() => handleChange(locale)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              current === locale
                ? 'bg-amber-700 text-white border-amber-700'
                : 'bg-transparent text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-500'
            }`}
          >
            {LOCALE_LABELS[locale]}
          </button>
        ))}
      </div>
    </div>
  )
}
