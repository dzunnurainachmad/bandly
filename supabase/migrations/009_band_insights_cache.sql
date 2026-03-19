-- ============================================================
-- CACHE AI INSIGHTS PER BAND
-- ============================================================

alter table bands
  add column if not exists insights          jsonb,
  add column if not exists insights_cached_at timestamptz;
