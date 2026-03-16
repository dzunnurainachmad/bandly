-- ============================================================
-- STORAGE — band photos
-- ============================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'band-photos',
  'band-photos',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
);

-- Anyone can read (public bucket)
create policy "public read band-photos"
  on storage.objects for select
  using (bucket_id = 'band-photos');

-- Only authenticated users can upload
create policy "auth upload band-photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'band-photos');

-- Only the uploader can delete their own file
create policy "auth delete band-photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'band-photos' and owner = auth.uid());
