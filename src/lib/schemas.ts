import { z } from 'zod'

export const BandInsightsSchema = z.object({
  style_tags: z
    .array(z.string())
    .describe('3-5 kata kunci gaya musik spesifik, contoh: "distorsi tebal", "vokal melengking"'),
  mood: z
    .array(z.string())
    .describe('2-4 kata suasana/mood musik, contoh: "melankolis", "energik"'),
  target_audience: z
    .string()
    .describe('Satu kalimat deskripsi target pendengar, contoh: "Anak muda 20-an yang suka..."'),
  strengths: z
    .array(z.string())
    .describe('2-3 kelebihan band berdasarkan profil yang tersedia'),
  booking_pitch: z
    .string()
    .describe('Satu kalimat pitch singkat untuk event organizer'),
})

export type BandInsights = z.infer<typeof BandInsightsSchema>
