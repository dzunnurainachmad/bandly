-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS
alter table provinces   enable row level security;
alter table cities      enable row level security;
alter table genres      enable row level security;
alter table bands       enable row level security;
alter table band_genres enable row level security;

-- ── Public read (anyone, including unauthenticated) ──────────
create policy "public read provinces"   on provinces   for select using (true);
create policy "public read cities"      on cities      for select using (true);
create policy "public read genres"      on genres      for select using (true);
create policy "public read bands"       on bands       for select using (true);
create policy "public read band_genres" on band_genres for select using (true);

-- ── band_genres insert/delete: owner only ────────────────────
create policy "auth insert band_genres"
  on band_genres for insert
  to authenticated
  with check (
    exists (
      select 1 from bands
      where bands.id = band_id
        and bands.user_id = auth.uid()
    )
  );

create policy "owner delete band_genres"
  on band_genres for delete
  to authenticated
  using (
    exists (
      select 1 from bands
      where bands.id = band_id
        and bands.user_id = auth.uid()
    )
  );

-- ── bands update: owner only ─────────────────────────────────
-- (admin update policy added in 005_admin.sql)
create policy "owner update bands"
  on bands for update
  to authenticated
  using     (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Note: "auth insert bands" and "owner/admin delete bands" are
-- created in 005_admin.sql because they reference the profiles table.
