# AI Cost Estimates

Approximate token usage and cost per feature, based on `gpt-4o-mini` pricing
($0.15 / 1M input tokens, $0.60 / 1M output tokens as of 2025).

---

## Per-request estimates

| Feature | Route | Input tokens | Output tokens | Cost/request |
|---------|-------|-------------|---------------|-------------|
| Chat (1 turn, no tools) | `/api/chat` | ~800 | ~200 | ~$0.0002 |
| Chat (1 turn + tool call) | `/api/chat` | ~1,200 | ~300 | ~$0.0003 |
| Band insights | `/api/analyze-band` | ~500 | ~300 | ~$0.0002 |
| Bio generator | `/api/generate-bio` | ~300 | ~150 | ~$0.0001 |
| Photo analysis (vision) | `/api/analyze-photo` | ~800 | ~200 | ~$0.0003 |
| Semantic search (embedding) | `/api/search` | ~50 | — | ~$0.000007 |
| Submit-band agent (3 steps) | `/api/agents/submit-band` | ~3,000 | ~600 | ~$0.0008 |
| Moderate-band agent (5 steps) | `/api/agents/moderate-band` | ~5,000 | ~800 | ~$0.0013 |
| Weekly insights (1 call) | `/api/agents/weekly-insights` | ~2,000 | ~500 | ~$0.0006 |

**Note:** Vision calls (analyze-photo, moderate-band analyzePhoto tool) cost more per image token.
Image token counts depend on image size — estimate 500–1,500 tokens per image.

---

## Monthly cost scenarios

| Traffic | Chats/day | Band analyses/day | Agents/day | Est. monthly |
|---------|-----------|-------------------|------------|-------------|
| Low (early users) | 50 | 10 | 5 | ~$1–3 |
| Medium | 500 | 50 | 20 | ~$10–20 |
| High | 5,000 | 200 | 50 | ~$80–150 |

---

## Cost controls in place

| Control | Value | Where |
|---------|-------|-------|
| `maxOutputTokens` on chat | 600 | `/api/chat` |
| `maxOutputTokens` on bio | 300 | `/api/generate-bio` |
| Max agent steps (submit-band) | 3 | `stopWhen: stepCountIs(3)` |
| Max agent steps (moderate-band) | 5 | `stopWhen: stepCountIs(5)` |
| Rate limit: chat | 15 req/min/IP | `src/lib/rate-limit.ts` |
| Rate limit: analyze-band | 5 req/min/IP | `src/lib/rate-limit.ts` |
| Rate limit: generate-bio | 5 req/min/IP | `src/lib/rate-limit.ts` |
| Rate limit: analyze-photo | 5 req/min/IP | `src/lib/rate-limit.ts` |
| Rate limit: submit-band agent | 3 req/min/IP | `src/lib/rate-limit.ts` |
| Rate limit: moderate-band agent | 5 req/min/IP | `src/lib/rate-limit.ts` |
| Band insights caching | 7-day TTL | `bands.insights_cached_at` |

---

## Upgrading rate limits for production

Current rate limiter is in-memory (`src/lib/rate-limit.ts`) — works per serverless
instance but resets on cold starts. For persistent rate limiting across Vercel instances:

```bash
npm install @upstash/ratelimit @upstash/redis
```

Then replace `checkRateLimit` in `src/lib/rate-limit.ts` with:
```ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '60 s'),
})
```

Add to env: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`

---

## Budget alerts

Set OpenAI usage alerts at:
- **$5/month** — warning (unusual traffic or a bug)
- **$20/month** — hard limit (pause API key if possible)

Configure at: https://platform.openai.com/settings/organization/billing
