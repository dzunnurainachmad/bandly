import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { getLocale, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { MiniPlayer } from '@/components/MiniPlayer'
import { FloatingChat } from '@/components/FloatingChat'
import { MainContent } from '@/components/MainContent'
import { PlayerProvider } from '@/contexts/PlayerContext'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AuthProvider } from '@/contexts/AuthContext'

const geist = Geist({ subsets: ['latin'] })

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bandtelusur.id'

export const metadata: Metadata = {
  title: 'BandTelusur — Temukan Band Indonesia',
  description:
    'Platform untuk menemukan band dan project musik di seluruh Indonesia. Filter berdasarkan provinsi, kota, dan genre.',
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: 'BandTelusur — Temukan Band Indonesia',
    description: 'Platform untuk menemukan band dan project musik di seluruh Indonesia. Filter berdasarkan provinsi, kota, dan genre.',
    url: BASE_URL,
    siteName: 'BandTelusur',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'BandTelusur — Temukan Band Indonesia',
    description: 'Platform untuk menemukan band dan project musik di seluruh Indonesia.',
  },
  robots: { index: true, follow: true },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`${geist.className} bg-[#faf6f0] dark:bg-[#1a1510] text-stone-900 dark:text-stone-100 antialiased`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider>
            <AuthProvider>
              <PlayerProvider>
                <Navbar />
                <MainContent>{children}</MainContent>
                <MiniPlayer />
                <FloatingChat />
              </PlayerProvider>
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
