import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bandtelusur.id'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/settings', '/admin', '/saved', '/auth'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
