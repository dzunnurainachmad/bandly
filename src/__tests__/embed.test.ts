import { describe, it, expect } from 'vitest'
import {
  getYouTubeEmbedUrl,
  getSpotifyEmbedUrl,
  getSpotifyEmbedHeight,
  getAppleMusicEmbedUrl,
  getAppleMusicEmbedHeight,
  getBandcampUrl,
} from '@/lib/embed'

describe('getYouTubeEmbedUrl', () => {
  it('converts youtube.com/watch?v= to embed', () => {
    expect(getYouTubeEmbedUrl('https://www.youtube.com/watch?v=abc123'))
      .toBe('https://www.youtube.com/embed/abc123')
  })

  it('converts youtu.be short link to embed', () => {
    expect(getYouTubeEmbedUrl('https://youtu.be/abc123'))
      .toBe('https://www.youtube.com/embed/abc123')
  })

  it('passes through existing embed URL', () => {
    expect(getYouTubeEmbedUrl('https://www.youtube.com/embed/abc123'))
      .toBe('https://www.youtube.com/embed/abc123')
  })

  it('converts music.youtube.com/watch?v= to embed', () => {
    expect(getYouTubeEmbedUrl('https://music.youtube.com/watch?v=xyz789'))
      .toBe('https://www.youtube.com/embed/xyz789')
  })

  it('returns null for non-YouTube URL', () => {
    expect(getYouTubeEmbedUrl('https://vimeo.com/123')).toBeNull()
  })

  it('returns null for invalid URL', () => {
    expect(getYouTubeEmbedUrl('not-a-url')).toBeNull()
  })

  it('returns null for YouTube URL without video ID', () => {
    expect(getYouTubeEmbedUrl('https://www.youtube.com/channel/UC123')).toBeNull()
  })
})

describe('getSpotifyEmbedUrl', () => {
  it('converts artist URL to embed', () => {
    expect(getSpotifyEmbedUrl('https://open.spotify.com/artist/abc123'))
      .toBe('https://open.spotify.com/embed/artist/abc123')
  })

  it('converts album URL to embed', () => {
    expect(getSpotifyEmbedUrl('https://open.spotify.com/album/xyz789'))
      .toBe('https://open.spotify.com/embed/album/xyz789')
  })

  it('converts track URL to embed', () => {
    expect(getSpotifyEmbedUrl('https://open.spotify.com/track/track1'))
      .toBe('https://open.spotify.com/embed/track/track1')
  })

  it('converts playlist URL to embed', () => {
    expect(getSpotifyEmbedUrl('https://open.spotify.com/playlist/pl123'))
      .toBe('https://open.spotify.com/embed/playlist/pl123')
  })

  it('handles already-embedded URL', () => {
    expect(getSpotifyEmbedUrl('https://open.spotify.com/embed/artist/abc123'))
      .toBe('https://open.spotify.com/embed/artist/abc123')
  })

  it('returns null for non-Spotify URL', () => {
    expect(getSpotifyEmbedUrl('https://example.com/artist/123')).toBeNull()
  })

  it('returns null for invalid URL', () => {
    expect(getSpotifyEmbedUrl('bad-url')).toBeNull()
  })
})

describe('getSpotifyEmbedHeight', () => {
  it('returns 152 for track URLs', () => {
    expect(getSpotifyEmbedHeight('https://open.spotify.com/embed/track/abc')).toBe(152)
  })

  it('returns 352 for non-track URLs', () => {
    expect(getSpotifyEmbedHeight('https://open.spotify.com/embed/artist/abc')).toBe(352)
  })
})

describe('getAppleMusicEmbedUrl', () => {
  it('converts Apple Music URL to embed', () => {
    expect(getAppleMusicEmbedUrl('https://music.apple.com/id/album/test/123'))
      .toBe('https://embed.music.apple.com/id/album/test/123')
  })

  it('preserves query params like track ID', () => {
    const url = 'https://music.apple.com/id/album/test/123?i=456'
    const result = getAppleMusicEmbedUrl(url)
    expect(result).toContain('embed.music.apple.com')
    expect(result).toContain('i=456')
  })

  it('returns null for non-Apple Music URL', () => {
    expect(getAppleMusicEmbedUrl('https://spotify.com/track/123')).toBeNull()
  })

  it('returns null for invalid URL', () => {
    expect(getAppleMusicEmbedUrl('not-valid')).toBeNull()
  })
})

describe('getAppleMusicEmbedHeight', () => {
  it('returns 175 for single track (?i=)', () => {
    expect(getAppleMusicEmbedHeight('https://embed.music.apple.com/id/album/x/123?i=456')).toBe(175)
  })

  it('returns 300 for artist', () => {
    expect(getAppleMusicEmbedHeight('https://embed.music.apple.com/id/artist/x/123')).toBe(300)
  })

  it('returns 450 for album/playlist', () => {
    expect(getAppleMusicEmbedHeight('https://embed.music.apple.com/id/album/x/123')).toBe(450)
  })
})

describe('getBandcampUrl', () => {
  it('returns URL for valid bandcamp domain', () => {
    expect(getBandcampUrl('https://myband.bandcamp.com')).toBe('https://myband.bandcamp.com')
  })

  it('returns URL for bandcamp subdomain with path', () => {
    expect(getBandcampUrl('https://myband.bandcamp.com/album/test'))
      .toBe('https://myband.bandcamp.com/album/test')
  })

  it('returns null for non-bandcamp URL', () => {
    expect(getBandcampUrl('https://example.com')).toBeNull()
  })

  it('returns null for invalid URL', () => {
    expect(getBandcampUrl('invalid')).toBeNull()
  })
})
