import { supabaseAdmin } from './supabase-admin'

export async function logAiCall({
  route,
  model,
  latencyMs,
  inputTokens,
  outputTokens,
  bandId,
}: {
  route: string
  model: string
  latencyMs?: number
  inputTokens?: number
  outputTokens?: number
  bandId?: string
}) {
  try {
    await supabaseAdmin.from('ai_logs').insert({
      route,
      model,
      latency_ms: latencyMs ?? null,
      input_tokens: inputTokens ?? null,
      output_tokens: outputTokens ?? null,
      band_id: bandId ?? null,
    })
  } catch (err) {
    console.error('[ai-logger] failed to log:', err)
  }
}
