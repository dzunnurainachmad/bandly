import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'
import { LOCALES, DEFAULT_LOCALE, type Locale } from './config'

export { LOCALES, DEFAULT_LOCALE, type Locale }

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const stored = cookieStore.get('NEXT_LOCALE')?.value
  const locale: Locale = LOCALES.includes(stored as Locale) ? (stored as Locale) : DEFAULT_LOCALE

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
