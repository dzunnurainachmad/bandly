import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/admin-queries'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { BarChart2 } from 'lucide-react'

// ── types ────────────────────────────────────────────────────────────────────

interface LogRow {
  route: string
  latency_ms: number | null
  input_tokens: number | null
  output_tokens: number | null
  created_at: string
}

interface FeedbackRow {
  route: string
  rating: string
}

interface AgentRow {
  agent_type: string
  steps_taken: number | null
  status: string
}

interface FlagRow {
  status: string
}

// ── helpers ──────────────────────────────────────────────────────────────────

function avg(nums: (number | null)[]): number {
  const valid = nums.filter((n): n is number => n !== null)
  return valid.length ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length) : 0
}

function sum(nums: (number | null)[]): number {
  return nums.filter((n): n is number => n !== null).reduce((a, b) => a + b, 0)
}

function groupBy<T>(arr: T[], key: (item: T) => string): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const k = key(item)
    ;(acc[k] ??= []).push(item)
    return acc
  }, {})
}

// ── data fetching ─────────────────────────────────────────────────────────────

async function fetchMetrics() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const [logsRes, feedbackRes, agentsRes, flagsRes] = await Promise.all([
    supabaseAdmin
      .from('ai_logs')
      .select('route, latency_ms, input_tokens, output_tokens, created_at')
      .gte('created_at', thirtyDaysAgo)
      .order('created_at', { ascending: false })
      .limit(2000),
    supabaseAdmin
      .from('ai_feedback')
      .select('route, rating'),
    supabaseAdmin
      .from('agent_runs')
      .select('agent_type, steps_taken, status')
      .gte('created_at', thirtyDaysAgo),
    supabaseAdmin
      .from('band_flags')
      .select('status'),
  ])

  const logs: LogRow[] = logsRes.data ?? []
  const feedback: FeedbackRow[] = feedbackRes.data ?? []
  const agents: AgentRow[] = agentsRes.data ?? []
  const flags: FlagRow[] = flagsRes.data ?? []

  // ── summary ────────────────────────────────────────────────────────────────
  const recentLogs = logs.filter((l) => l.created_at >= sevenDaysAgo)
  const totalCalls30d = logs.length
  const totalCalls7d = recentLogs.length
  const avgLatency7d = avg(recentLogs.map((l) => l.latency_ms))
  const totalTokens7d = sum(recentLogs.map((l) => (l.input_tokens ?? 0) + (l.output_tokens ?? 0)))
  const goodFeedback = feedback.filter((f) => f.rating === 'good').length
  const feedbackTotal = feedback.length
  const goodRate = feedbackTotal ? Math.round((goodFeedback / feedbackTotal) * 100) : null

  // ── by route (30d) ─────────────────────────────────────────────────────────
  const byRoute = groupBy(logs, (l) => l.route)
  const feedbackByRoute = groupBy(feedback, (f) => f.route)

  const routeStats = Object.entries(byRoute)
    .map(([route, rows]) => {
      const fb = feedbackByRoute[route] ?? []
      const good = fb.filter((f) => f.rating === 'good').length
      return {
        route,
        calls: rows.length,
        avgLatency: avg(rows.map((r) => r.latency_ms)),
        totalTokens: sum(rows.map((r) => (r.input_tokens ?? 0) + (r.output_tokens ?? 0))),
        goodRate: fb.length ? Math.round((good / fb.length) * 100) : null,
        feedbackCount: fb.length,
      }
    })
    .sort((a, b) => b.calls - a.calls)

  // ── agent stats ────────────────────────────────────────────────────────────
  const byAgent = groupBy(agents, (a) => a.agent_type)
  const agentStats = Object.entries(byAgent)
    .map(([type, rows]) => ({
      type,
      runs: rows.length,
      avgSteps: avg(rows.map((r) => r.steps_taken)),
      successRate: Math.round((rows.filter((r) => r.status === 'completed').length / rows.length) * 100),
    }))
    .sort((a, b) => b.runs - a.runs)

  // ── flag stats ─────────────────────────────────────────────────────────────
  const flagStats = {
    pending: flags.filter((f) => f.status === 'pending').length,
    approved: flags.filter((f) => f.status === 'approved').length,
    rejected: flags.filter((f) => f.status === 'rejected').length,
  }

  return { totalCalls30d, totalCalls7d, avgLatency7d, totalTokens7d, goodRate, feedbackTotal, routeStats, agentStats, flagStats }
}

// ── components ────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-5">
      <p className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wide font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">{value}</p>
      {sub && <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">{sub}</p>}
    </div>
  )
}

function Badge({ value, suffix = '%' }: { value: number | null; suffix?: string }) {
  if (value === null) return <span className="text-stone-400 text-sm">—</span>
  const color = value >= 80 ? 'text-green-600 dark:text-green-400' : value >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
  return <span className={`font-medium text-sm ${color}`}>{value}{suffix}</span>
}

// ── page ──────────────────────────────────────────────────────────────────────

export default async function AiMetricsPage() {
  if (!(await isAdmin())) redirect('/')

  const {
    totalCalls30d, totalCalls7d, avgLatency7d, totalTokens7d,
    goodRate, feedbackTotal, routeStats, agentStats, flagStats,
  } = await fetchMetrics()

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8 flex items-center gap-3">
        <BarChart2 className="w-6 h-6 text-amber-600 dark:text-amber-400" />
        <div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">AI Metrics</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">30-day window · refreshes on page load</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <StatCard label="AI calls (7d)" value={totalCalls7d} sub={`${totalCalls30d} last 30d`} />
        <StatCard label="Avg latency (7d)" value={`${avgLatency7d} ms`} />
        <StatCard label="Tokens used (7d)" value={totalTokens7d.toLocaleString()} />
        <StatCard
          label="Feedback good rate"
          value={goodRate !== null ? `${goodRate}%` : '—'}
          sub={feedbackTotal ? `${feedbackTotal} ratings` : 'no ratings yet'}
        />
      </div>

      {/* By route */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wide mb-3">By Route (30d)</h2>
        <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-700 text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                <th className="text-left px-4 py-3 font-medium">Route</th>
                <th className="text-right px-4 py-3 font-medium">Calls</th>
                <th className="text-right px-4 py-3 font-medium">Avg latency</th>
                <th className="text-right px-4 py-3 font-medium">Tokens</th>
                <th className="text-right px-4 py-3 font-medium">Good rate</th>
              </tr>
            </thead>
            <tbody>
              {routeStats.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-stone-400 text-sm">No data yet</td>
                </tr>
              )}
              {routeStats.map((r, i) => (
                <tr
                  key={r.route}
                  className={`border-b border-stone-100 dark:border-stone-700/50 last:border-0 ${i % 2 === 1 ? 'bg-stone-50/50 dark:bg-stone-900/20' : ''}`}
                >
                  <td className="px-4 py-3 font-mono text-xs text-stone-700 dark:text-stone-300">{r.route}</td>
                  <td className="px-4 py-3 text-right text-stone-800 dark:text-stone-200">{r.calls}</td>
                  <td className="px-4 py-3 text-right text-stone-500 dark:text-stone-400">{r.avgLatency} ms</td>
                  <td className="px-4 py-3 text-right text-stone-500 dark:text-stone-400">{r.totalTokens.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <Badge value={r.goodRate} />
                    {r.feedbackCount > 0 && (
                      <span className="text-xs text-stone-400 ml-1">({r.feedbackCount})</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Agent runs */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wide mb-3">Agent Runs (30d)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {agentStats.length === 0 && (
            <p className="text-sm text-stone-400 col-span-3">No agent runs yet</p>
          )}
          {agentStats.map((a) => (
            <div key={a.type} className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-5">
              <p className="text-xs font-mono text-stone-500 dark:text-stone-400 mb-2">{a.type}</p>
              <p className="text-xl font-bold text-stone-900 dark:text-stone-100">{a.runs} runs</p>
              <div className="flex gap-4 mt-2 text-xs text-stone-500 dark:text-stone-400">
                <span>avg {a.avgSteps} steps</span>
                <span>·</span>
                <Badge value={a.successRate} /> <span className="ml-1">success</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flag stats */}
      <section>
        <h2 className="text-sm font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wide mb-3">Band Flags (all time)</h2>
        <div className="grid grid-cols-3 gap-4 max-w-sm">
          <StatCard label="Pending" value={flagStats.pending} />
          <StatCard label="Approved" value={flagStats.approved} />
          <StatCard label="Rejected" value={flagStats.rejected} />
        </div>
      </section>
    </div>
  )
}
