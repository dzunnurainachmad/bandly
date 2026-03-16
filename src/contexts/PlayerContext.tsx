'use client'

import { createContext, useContext, useState } from 'react'

export type PlayerSource = 'youtube' | 'spotify' | 'apple_music'

export interface PlayerTrack {
  bandId: string
  bandName: string
  photoUrl: string | null
  youtubeEmbed: string | null
  spotifyEmbed: string | null
  spotifyHeight: number
  appleMusicEmbed: string | null
  appleMusicHeight: number
  source: PlayerSource
}

interface PlayerContextValue {
  track: PlayerTrack | null
  expanded: boolean
  play: (track: PlayerTrack) => void
  close: () => void
  switchSource: (source: PlayerSource) => void
  setExpanded: (v: boolean) => void
}

const PlayerContext = createContext<PlayerContextValue | null>(null)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [track, setTrack] = useState<PlayerTrack | null>(null)
  const [expanded, setExpanded] = useState(true)

  function play(t: PlayerTrack) {
    setTrack(t)
    setExpanded(true)
  }

  function close() {
    setTrack(null)
    setExpanded(false)
  }

  function switchSource(source: PlayerSource) {
    if (track) setTrack({ ...track, source })
  }

  return (
    <PlayerContext.Provider value={{ track, expanded, play, close, switchSource, setExpanded }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider')
  return ctx
}
