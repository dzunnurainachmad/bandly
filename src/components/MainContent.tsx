'use client'

import { usePlayer } from '@/contexts/PlayerContext'

export function MainContent({ children }: { children: React.ReactNode }) {
  const { track } = usePlayer()

  return (
    <main className={`lg:ml-16 ${track ? 'pb-[calc(10rem+env(safe-area-inset-bottom))] lg:pb-0' : 'pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-0'}`}>
      {children}
    </main>
  )
}
