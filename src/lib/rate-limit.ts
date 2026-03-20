// In-memory sliding window rate limiter.
//
// Works per serverless instance — fine for single-instance dev/staging.
// For multi-instance production on Vercel, replace `store` with Upstash Redis:
//   import { Ratelimit } from '@upstash/ratelimit'
//   import { Redis } from '@upstash/redis'

const store = new Map<string, { timestamps: number[] }>()

export function checkRateLimit(
  key: string,
  max: number,
  windowMs: number,
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const windowStart = now - windowMs

  const entry = store.get(key) ?? { timestamps: [] }
  entry.timestamps = entry.timestamps.filter((t) => t > windowStart)

  if (entry.timestamps.length >= max) {
    store.set(key, entry)
    return { allowed: false, remaining: 0 }
  }

  entry.timestamps.push(now)
  store.set(key, entry)
  return { allowed: true, remaining: max - entry.timestamps.length }
}

export function getIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

export function rateLimitResponse() {
  return Response.json(
    { error: 'Terlalu banyak permintaan. Coba lagi dalam satu menit.' },
    { status: 429 },
  )
}
