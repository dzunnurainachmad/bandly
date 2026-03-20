# AI Feature Decisions

Per-feature log of what was tried, what failed, and what was kept and why.
Updated as features ship or change.

---

## Chat Assistant (`/api/chat`)

**Decision: Multi-tool routing via system prompt, not classifier**
- Tried: single `searchBands` tool for all queries
- Problem: semantic queries ("cari band post-punk") returned empty results because they hit exact-match SQL
- Kept: two distinct tools — `searchBands` (filter-based) and `semanticSearch` (pgvector cosine similarity) — with system prompt instructing the LLM to choose based on query type
- Why: letting the LLM route is more robust than a separate classifier and avoids an extra round-trip

**Decision: Stream responses, not batch**
- Kept from day 1; chat feels instant even on slow connections
- Tradeoff: harder to log full output — solved by logging on `onFinish` callback

**Decision: Prompt versioned as `chat:v1`**
- Bump version in `PROMPT_VERSIONS` when changing the system prompt so eval reports can diff performance

---

## Band Insights (`/api/analyze-band`)

**Decision: Structured output with Zod schema (`BandInsightsSchema`)**
- Tried: free-form text, then parsed with regex
- Problem: regex broke on minor formatting changes
- Kept: `generateObject` with `BandInsightsSchema` — guarantees shape at the type level
- Schema: `style_tags`, `mood`, `target_audience`, `strengths`, `booking_pitch`

**Decision: Cache insights on the `bands` table (`insights` + `insights_cached_at`)**
- Why: each call costs ~1k tokens; most band profiles don't change
- TTL: re-generate if `insights_cached_at` is older than 7 days or null

---

## Photo Analysis (`/api/analyze-photo`)

**Decision: Vision model for genre/vibe suggestion**
- Input: base64 image + available genres list
- Output: suggested genres + vibe tags
- Why: saves user effort on genre tagging; reduces mis-categorization
- Failure mode: model sometimes hallucinates genres not in the list → prompt now explicitly says "only suggest genres from the provided list"

---

## Bio Generator (`/api/generate-bio`)

**Decision: Short, opinionated output (2–3 sentences)**
- Tried: longer bios (5+ sentences)
- Problem: users edited them down anyway; longer = more hallucination risk
- Kept: 2–3 sentence constraint in prompt
- Metric to watch: `ai_feedback` good rate for `generate-bio` route

---

## Band Submission Agent (`/api/agents/submit-band`)

**Decision: Single agent call with `fetchUrl` tool, not a separate scraping service**
- Why: keeps the stack simple; Vercel functions can fetch external URLs
- Failure mode: some Instagram/Spotify URLs block server-side fetches → agent marks confidence as `low` for those fields
- Human-in-the-loop: agent pre-fills the form but the user reviews before submitting

**Decision: Confidence scores per field**
- `high` / `medium` / `low` per extracted field so UI can highlight uncertain ones
- Defined in `SubmitBandAgentSchema`

---

## Moderation Agent (`/api/agents/moderate-band`)

**Decision: 3-tool pipeline: getBandData → analyzePhoto → getSimilarBands**
- Why: verdict quality improves significantly when the LLM has visual + context data
- Each step logged to `agent_runs` for observability
- Output: `verdict` (approve / reject / needs_review) + `reasoning` + per-check scores

**Decision: Human final action required**
- Agent recommends, admin approves/rejects via `/admin/moderate` UI
- Why: false positives on legitimate bands would erode trust; auto-reject is too risky

---

## Weekly Insights Agent (`/api/agents/weekly-insights`)

**Decision: Cron-triggered, not on-demand**
- Vercel cron runs every Monday 9am WIB (defined in `vercel.json`)
- Report saved to `weekly_reports` table; no email/notification yet
- Why: report generation is slow (~10s) and not time-sensitive

**Decision: Narrative format, not raw stats**
- LLM produces a natural-language summary + structured `top_genres` / `top_provinces` arrays
- Why: easier to read for non-technical stakeholders; raw stats are in the DB anyway

---

## Eval System (`npm run eval`)

**Decision: LLM-as-judge, not rule-only**
- Unit rules (tool schema shape, required fields) run without API calls
- LLM judge scores response quality on a 1–5 rubric — only run explicitly
- Why: deterministic rules catch regressions fast; LLM judge catches quality drift
- Reports saved to `evals/reports/` as JSON with timestamp + prompt_version

**Decision: `PROMPT_VERSIONS` registry in `prompts.ts`**
- Every prompt has a version key; `ai-logger` records it on each call
- Why: lets you correlate `ai_logs.prompt_version` with eval report scores to measure prompt changes
