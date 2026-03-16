/**
 * Parse a YouTube or YouTube Music URL and return an embed URL, or null if not embeddable.
 *
 * Supported formats:
 *   https://www.youtube.com/watch?v=VIDEO_ID
 *   https://youtu.be/VIDEO_ID
 *   https://www.youtube.com/embed/VIDEO_ID   (already embed)
 *   https://music.youtube.com/watch?v=VIDEO_ID
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)

    // Already an embed URL
    if (u.pathname.startsWith('/embed/')) return url

    // youtu.be/VIDEO_ID
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.slice(1)
      if (id) return `https://www.youtube.com/embed/${id}`
    }

    // youtube.com/watch?v=VIDEO_ID or music.youtube.com/watch?v=VIDEO_ID
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v')
      if (id) return `https://www.youtube.com/embed/${id}`
    }

    return null
  } catch {
    return null
  }
}

/**
 * Parse a Spotify URL and return an embed URL, or null if not parseable.
 *
 * Supported formats:
 *   https://open.spotify.com/artist/ID
 *   https://open.spotify.com/album/ID
 *   https://open.spotify.com/track/ID
 *   https://open.spotify.com/playlist/ID
 */
export function getSpotifyEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    if (!u.hostname.includes('spotify.com')) return null

    // Strip /embed prefix if already present
    const path = u.pathname.replace('/embed', '')

    // Expect /type/ID
    const match = path.match(/^\/(artist|album|track|playlist)\/([a-zA-Z0-9]+)/)
    if (!match) return null

    const [, type, id] = match
    return `https://open.spotify.com/embed/${type}/${id}`
  } catch {
    return null
  }
}

/** Height for the Spotify embed: tracks are compact, everything else is taller */
export function getSpotifyEmbedHeight(url: string): number {
  return url.includes('/track/') ? 152 : 352
}

/**
 * Parse an Apple Music URL and return an embed URL, or null if not parseable.
 *
 * Supported formats:
 *   https://music.apple.com/{country}/album/{name}/{id}
 *   https://music.apple.com/{country}/album/{name}/{id}?i={track_id}
 *   https://music.apple.com/{country}/artist/{name}/{id}
 *   https://music.apple.com/{country}/playlist/{name}/{id}
 */
export function getAppleMusicEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    if (!u.hostname.includes('music.apple.com')) return null
    // Replace hostname with embed hostname
    u.hostname = 'embed.music.apple.com'
    return u.toString()
  } catch {
    return null
  }
}

/** Height for Apple Music embed based on content type */
export function getAppleMusicEmbedHeight(url: string): number {
  if (url.includes('?i=') || url.includes('&i=')) return 175  // single track
  if (url.includes('/artist/')) return 300
  return 450  // album / playlist
}

/**
 * Return a normalised Bandcamp URL or null.
 * Bandcamp does not provide a public embed URL derivable from the page URL,
 * so we only validate/store the URL for display as a link.
 */
export function getBandcampUrl(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.endsWith('bandcamp.com')) return url
    return null
  } catch {
    return null
  }
}
