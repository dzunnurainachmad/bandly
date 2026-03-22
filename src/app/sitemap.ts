import type { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bandtelusur.id'

  const { data: bands } = await supabase
    .from('bands_view')
    .select('id, username, updated_at')
    .order('updated_at', { ascending: false })

  const bandUrls: MetadataRoute.Sitemap = (bands ?? []).map((band) => ({
    url: `${baseUrl}/bands/${band.username ?? band.id}`,
    lastModified: band.updated_at,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/browse`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/chat`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/submit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...bandUrls,
  ]
}
