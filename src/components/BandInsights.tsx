'use client'

import { useState, useEffect } from 'react'
import { experimental_useObject as useObject } from '@ai-sdk/react'
import { Sparkles, Loader2, ThumbsUp, ThumbsDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { BandInsightsSchema } from '@/lib/schemas'
import type { BandInsights as BandInsightsType } from '@/lib/schemas'
import type { Band } from '@/types'
import { Button } from '@/components/ui/Button'

interface Props {
  band: Pick<Band, 'id' | 'name' | 'bio' | 'formed_year' | 'province_name' | 'city_name' | 'genres'>
}

export function BandInsights({ band }: Props) {
  const t = useTranslations('bandInsights')
  const [cached, setCached] = useState<BandInsightsType | null>(null)
  const [loadingCache, setLoadingCache] = useState(true)
  const [feedbackSent, setFeedbackSent] = useState<'good' | 'bad' | null>(null)
  const { object: streamed, submit, isLoading, error, clear } = useObject({
    api: '/api/analyze-band',
    schema: BandInsightsSchema,
  })

  useEffect(() => {
    fetch(`/api/analyze-band?band_id=${band.id}`)
      .then((r) => r.json())
      .then((data) => { if (data?.insights) setCached(data.insights) })
      .finally(() => setLoadingCache(false))
  }, [band.id])

  const insights = streamed ?? cached

  function sendFeedback(rating: 'good' | 'bad') {
    if (!insights) return
    setFeedbackSent(rating)
    fetch('/api/ai-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        band_id: band.id,
        route: 'analyze-band',
        input: { name: band.name, bio: band.bio, genres: band.genres?.map((g) => g.name), province: band.province_name, city: band.city_name, formed_year: band.formed_year },
        output: insights,
        rating,
      }),
    })
  }

  function analyze() {
    setCached(null)
    setFeedbackSent(null)
    submit({
      band_id: band.id,
      name: band.name,
      bio: band.bio,
      genres: band.genres?.map((g) => g.name),
      province: band.province_name,
      city: band.city_name,
      formed_year: band.formed_year,
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          {t('title')}
        </h2>
        {!insights && !loadingCache && (
          <Button
            variant="secondary"
            size="sm"
            onClick={analyze}
            loading={isLoading}
            className="border-amber-400 text-amber-700 dark:text-amber-400 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/20"
          >
            {isLoading ? t('analyzing') : <><Sparkles className="w-3.5 h-3.5" /> {t('analyze')}</>}
          </Button>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">{t('error')}</p>
      )}

      {(insights || isLoading) && (
        <div className="space-y-4 text-sm">
          {/* Style tags + Mood */}
          <div className="flex flex-wrap gap-2">
            {insights?.style_tags?.filter((tag): tag is string => !!tag).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
            {insights?.mood?.filter((m): m is string => !!m).map((m) => (
              <span
                key={m}
                className="px-2.5 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded-full text-xs"
              >
                {m}
              </span>
            ))}
            {isLoading && !insights?.style_tags?.length && (
              <span className="px-2.5 py-1 bg-stone-100 dark:bg-stone-800 rounded-full text-xs text-stone-400 animate-pulse">
                {t('analyzing')}
              </span>
            )}
          </div>

          {/* Target audience */}
          {insights?.target_audience && (
            <div>
              <p className="text-xs font-medium text-stone-500 dark:text-stone-500 uppercase tracking-wide mb-1">{t('targetAudience')}</p>
              <p className="text-stone-600 dark:text-stone-400">{insights.target_audience}</p>
            </div>
          )}

          {/* Strengths */}
          {insights?.strengths && insights.strengths.length > 0 && (
            <div>
              <p className="text-xs font-medium text-stone-500 dark:text-stone-500 uppercase tracking-wide mb-1">{t('strengths')}</p>
              <ul className="space-y-1">
                {insights.strengths.filter((s): s is string => !!s).map((s) => (
                  <li key={s} className="flex items-start gap-2 text-stone-600 dark:text-stone-400">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Booking pitch */}
          {insights?.booking_pitch && (
            <div className="border border-amber-200 dark:border-amber-800 rounded-lg p-3 bg-amber-50 dark:bg-amber-900/20">
              <p className="text-xs font-medium text-amber-700 dark:text-amber-500 uppercase tracking-wide mb-1">{t('bookingPitch')}</p>
              <p className="text-stone-700 dark:text-stone-300 italic">&ldquo;{insights.booking_pitch}&rdquo;</p>
            </div>
          )}

          {!isLoading && (
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={clear} className="text-xs">
                {t('reset')}
              </Button>
              {feedbackSent ? (
                <span className="text-xs text-stone-400">{t('thanks')}</span>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-400">{t('accurate')}</span>
                  <button onClick={() => sendFeedback('good')} className="text-stone-400 hover:text-green-500 transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => sendFeedback('bad')} className="text-stone-400 hover:text-red-500 transition-colors">
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
