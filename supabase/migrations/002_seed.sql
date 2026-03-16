-- ============================================================
-- PROVINCES (all 34)
-- ============================================================
insert into provinces (name, slug) values
('Aceh', 'aceh'),
('Sumatera Utara', 'sumatera-utara'),
('Sumatera Barat', 'sumatera-barat'),
('Riau', 'riau'),
('Kepulauan Riau', 'kepulauan-riau'),
('Jambi', 'jambi'),
('Sumatera Selatan', 'sumatera-selatan'),
('Bengkulu', 'bengkulu'),
('Lampung', 'lampung'),
('Bangka Belitung', 'bangka-belitung'),
('DKI Jakarta', 'dki-jakarta'),
('Jawa Barat', 'jawa-barat'),
('Banten', 'banten'),
('Jawa Tengah', 'jawa-tengah'),
('DI Yogyakarta', 'di-yogyakarta'),
('Jawa Timur', 'jawa-timur'),
('Bali', 'bali'),
('Nusa Tenggara Barat', 'nusa-tenggara-barat'),
('Nusa Tenggara Timur', 'nusa-tenggara-timur'),
('Kalimantan Barat', 'kalimantan-barat'),
('Kalimantan Tengah', 'kalimantan-tengah'),
('Kalimantan Selatan', 'kalimantan-selatan'),
('Kalimantan Timur', 'kalimantan-timur'),
('Kalimantan Utara', 'kalimantan-utara'),
('Sulawesi Utara', 'sulawesi-utara'),
('Gorontalo', 'gorontalo'),
('Sulawesi Tengah', 'sulawesi-tengah'),
('Sulawesi Barat', 'sulawesi-barat'),
('Sulawesi Selatan', 'sulawesi-selatan'),
('Sulawesi Tenggara', 'sulawesi-tenggara'),
('Maluku', 'maluku'),
('Maluku Utara', 'maluku-utara'),
('Papua Barat', 'papua-barat'),
('Papua', 'papua');

-- ============================================================
-- KOTA & KABUPATEN (all provinces)
-- Note: where a kota and kab share the same base name within
--       one province, both are prefixed: "Kota X" / "Kab. X"
-- ============================================================
insert into cities (name, slug, province_id) values

-- ── Aceh (1) ─────────────────────────────────────────────
-- Kota
('Banda Aceh', 'banda-aceh', 1),
('Sabang', 'sabang', 1),
('Langsa', 'langsa', 1),
('Lhokseumawe', 'lhokseumawe', 1),
('Subulussalam', 'subulussalam', 1),
-- Kabupaten
('Kab. Aceh Besar', 'kab-aceh-besar', 1),
('Kab. Pidie', 'kab-pidie', 1),
('Kab. Pidie Jaya', 'kab-pidie-jaya', 1),
('Kab. Bireuen', 'kab-bireuen', 1),
('Kab. Aceh Utara', 'kab-aceh-utara', 1),
('Kab. Aceh Timur', 'kab-aceh-timur', 1),
('Kab. Aceh Tengah', 'kab-aceh-tengah', 1),
('Kab. Aceh Tenggara', 'kab-aceh-tenggara', 1),
('Kab. Aceh Selatan', 'kab-aceh-selatan', 1),
('Kab. Aceh Barat', 'kab-aceh-barat', 1),
('Kab. Aceh Barat Daya', 'kab-aceh-barat-daya', 1),
('Kab. Nagan Raya', 'kab-nagan-raya', 1),
('Kab. Aceh Jaya', 'kab-aceh-jaya', 1),
('Kab. Simeulue', 'kab-simeulue', 1),
('Kab. Aceh Singkil', 'kab-aceh-singkil', 1),
('Kab. Gayo Lues', 'kab-gayo-lues', 1),
('Kab. Bener Meriah', 'kab-bener-meriah', 1),

-- ── Sumatera Utara (2) ───────────────────────────────────
-- Kota
('Medan', 'medan', 2),
('Binjai', 'binjai', 2),
('Pematangsiantar', 'pematangsiantar', 2),
('Tebing Tinggi', 'tebing-tinggi', 2),
('Tanjungbalai', 'tanjungbalai', 2),
('Sibolga', 'sibolga', 2),
('Padangsidimpuan', 'padangsidimpuan', 2),
('Gunungsitoli', 'gunungsitoli', 2),
-- Kabupaten
('Kab. Deli Serdang', 'kab-deli-serdang', 2),
('Kab. Langkat', 'kab-langkat', 2),
('Kab. Karo', 'kab-karo', 2),
('Kab. Simalungun', 'kab-simalungun', 2),
('Kab. Dairi', 'kab-dairi', 2),
('Kab. Tapanuli Utara', 'kab-tapanuli-utara', 2),
('Kab. Tapanuli Tengah', 'kab-tapanuli-tengah', 2),
('Kab. Tapanuli Selatan', 'kab-tapanuli-selatan', 2),
('Kab. Mandailing Natal', 'kab-mandailing-natal', 2),
('Kab. Humbang Hasundutan', 'kab-humbang-hasundutan', 2),
('Kab. Pakpak Bharat', 'kab-pakpak-bharat', 2),
('Kab. Samosir', 'kab-samosir', 2),
('Kab. Toba', 'kab-toba', 2),
('Kab. Labuhanbatu', 'kab-labuhanbatu', 2),
('Kab. Labuhanbatu Utara', 'kab-labuhanbatu-utara', 2),
('Kab. Labuhanbatu Selatan', 'kab-labuhanbatu-selatan', 2),
('Kab. Padang Lawas', 'kab-padang-lawas', 2),
('Kab. Padang Lawas Utara', 'kab-padang-lawas-utara', 2),
('Kab. Asahan', 'kab-asahan', 2),
('Kab. Batubara', 'kab-batubara', 2),
('Kab. Serdang Bedagai', 'kab-serdang-bedagai', 2),
('Kab. Nias', 'kab-nias', 2),
('Kab. Nias Selatan', 'kab-nias-selatan', 2),
('Kab. Nias Utara', 'kab-nias-utara', 2),
('Kab. Nias Barat', 'kab-nias-barat', 2),

-- ── Sumatera Barat (3) ───────────────────────────────────
-- Kota
('Padang', 'padang', 3),
('Bukittinggi', 'bukittinggi', 3),
('Payakumbuh', 'payakumbuh', 3),
('Padang Panjang', 'padang-panjang', 3),
('Pariaman', 'pariaman', 3),
('Kota Solok', 'kota-solok', 3),
('Sawahlunto', 'sawahlunto', 3),
-- Kabupaten
('Kab. Agam', 'kab-agam', 3),
('Kab. Pasaman', 'kab-pasaman', 3),
('Kab. Pasaman Barat', 'kab-pasaman-barat', 3),
('Kab. Lima Puluh Kota', 'kab-lima-puluh-kota', 3),
('Kab. Tanah Datar', 'kab-tanah-datar', 3),
('Kab. Padang Pariaman', 'kab-padang-pariaman', 3),
('Kab. Pesisir Selatan', 'kab-pesisir-selatan', 3),
('Kab. Solok', 'kab-solok', 3),
('Kab. Solok Selatan', 'kab-solok-selatan', 3),
('Kab. Sijunjung', 'kab-sijunjung', 3),
('Kab. Dharmasraya', 'kab-dharmasraya', 3),
('Kab. Kepulauan Mentawai', 'kab-kepulauan-mentawai', 3),

-- ── Riau (4) ─────────────────────────────────────────────
-- Kota
('Pekanbaru', 'pekanbaru', 4),
('Dumai', 'dumai', 4),
-- Kabupaten
('Kab. Kampar', 'kab-kampar', 4),
('Kab. Rokan Hulu', 'kab-rokan-hulu', 4),
('Kab. Rokan Hilir', 'kab-rokan-hilir', 4),
('Kab. Bengkalis', 'kab-bengkalis', 4),
('Kab. Siak', 'kab-siak', 4),
('Kab. Pelalawan', 'kab-pelalawan', 4),
('Kab. Indragiri Hulu', 'kab-indragiri-hulu', 4),
('Kab. Indragiri Hilir', 'kab-indragiri-hilir', 4),
('Kab. Kuantan Singingi', 'kab-kuantan-singingi', 4),
('Kab. Kepulauan Meranti', 'kab-kepulauan-meranti', 4),

-- ── Kepulauan Riau (5) ───────────────────────────────────
-- Kota
('Batam', 'batam', 5),
('Tanjungpinang', 'tanjungpinang', 5),
-- Kabupaten
('Kab. Bintan', 'kab-bintan', 5),
('Kab. Karimun', 'kab-karimun', 5),
('Kab. Natuna', 'kab-natuna', 5),
('Kab. Lingga', 'kab-lingga', 5),
('Kab. Kepulauan Anambas', 'kab-kepulauan-anambas', 5),

-- ── Jambi (6) ────────────────────────────────────────────
-- Kota
('Kota Jambi', 'kota-jambi', 6),
('Sungai Penuh', 'sungai-penuh', 6),
-- Kabupaten
('Kab. Batanghari', 'kab-batanghari', 6),
('Kab. Muaro Jambi', 'kab-muaro-jambi', 6),
('Kab. Bungo', 'kab-bungo', 6),
('Kab. Tebo', 'kab-tebo', 6),
('Kab. Merangin', 'kab-merangin', 6),
('Kab. Sarolangun', 'kab-sarolangun', 6),
('Kab. Tanjung Jabung Barat', 'kab-tanjung-jabung-barat', 6),
('Kab. Tanjung Jabung Timur', 'kab-tanjung-jabung-timur', 6),
('Kab. Kerinci', 'kab-kerinci', 6),

-- ── Sumatera Selatan (7) ─────────────────────────────────
-- Kota
('Palembang', 'palembang', 7),
('Prabumulih', 'prabumulih', 7),
('Pagar Alam', 'pagar-alam', 7),
('Lubuklinggau', 'lubuklinggau', 7),
-- Kabupaten
('Kab. Ogan Komering Ulu', 'kab-oku', 7),
('Kab. OKU Selatan', 'kab-oku-selatan', 7),
('Kab. OKU Timur', 'kab-oku-timur', 7),
('Kab. Ogan Komering Ilir', 'kab-oki', 7),
('Kab. Muara Enim', 'kab-muara-enim', 7),
('Kab. Lahat', 'kab-lahat', 7),
('Kab. Musi Rawas', 'kab-musi-rawas', 7),
('Kab. Musi Rawas Utara', 'kab-musi-rawas-utara', 7),
('Kab. Musi Banyuasin', 'kab-musi-banyuasin', 7),
('Kab. Banyuasin', 'kab-banyuasin', 7),
('Kab. Empat Lawang', 'kab-empat-lawang', 7),
('Kab. Ogan Ilir', 'kab-ogan-ilir', 7),
('Kab. PALI', 'kab-pali', 7),

-- ── Bengkulu (8) ─────────────────────────────────────────
-- Kota
('Kota Bengkulu', 'kota-bengkulu', 8),
-- Kabupaten
('Kab. Bengkulu Utara', 'kab-bengkulu-utara', 8),
('Kab. Bengkulu Tengah', 'kab-bengkulu-tengah', 8),
('Kab. Bengkulu Selatan', 'kab-bengkulu-selatan', 8),
('Kab. Kaur', 'kab-kaur', 8),
('Kab. Seluma', 'kab-seluma', 8),
('Kab. Mukomuko', 'kab-mukomuko', 8),
('Kab. Lebong', 'kab-lebong', 8),
('Kab. Rejang Lebong', 'kab-rejang-lebong', 8),
('Kab. Kepahiang', 'kab-kepahiang', 8),

-- ── Lampung (9) ──────────────────────────────────────────
-- Kota
('Bandar Lampung', 'bandar-lampung', 9),
('Metro', 'metro', 9),
-- Kabupaten
('Kab. Lampung Utara', 'kab-lampung-utara', 9),
('Kab. Lampung Selatan', 'kab-lampung-selatan', 9),
('Kab. Lampung Tengah', 'kab-lampung-tengah', 9),
('Kab. Lampung Barat', 'kab-lampung-barat', 9),
('Kab. Lampung Timur', 'kab-lampung-timur', 9),
('Kab. Mesuji', 'kab-mesuji', 9),
('Kab. Tulang Bawang', 'kab-tulang-bawang', 9),
('Kab. Tulang Bawang Barat', 'kab-tulang-bawang-barat', 9),
('Kab. Pringsewu', 'kab-pringsewu', 9),
('Kab. Pesawaran', 'kab-pesawaran', 9),
('Kab. Tanggamus', 'kab-tanggamus', 9),
('Kab. Way Kanan', 'kab-way-kanan', 9),
('Kab. Pesisir Barat', 'kab-pesisir-barat', 9),

-- ── Bangka Belitung (10) ─────────────────────────────────
-- Kota
('Pangkalpinang', 'pangkalpinang', 10),
-- Kabupaten
('Kab. Bangka', 'kab-bangka', 10),
('Kab. Bangka Barat', 'kab-bangka-barat', 10),
('Kab. Bangka Tengah', 'kab-bangka-tengah', 10),
('Kab. Bangka Selatan', 'kab-bangka-selatan', 10),
('Kab. Belitung', 'kab-belitung', 10),
('Kab. Belitung Timur', 'kab-belitung-timur', 10),

-- ── DKI Jakarta (11) ─────────────────────────────────────
('Jakarta Pusat', 'jakarta-pusat', 11),
('Jakarta Utara', 'jakarta-utara', 11),
('Jakarta Barat', 'jakarta-barat', 11),
('Jakarta Selatan', 'jakarta-selatan', 11),
('Jakarta Timur', 'jakarta-timur', 11),
('Kab. Kepulauan Seribu', 'kab-kepulauan-seribu', 11),

-- ── Jawa Barat (12) ──────────────────────────────────────
-- Kota (use "Kota X" for names that also exist as kabupaten)
('Kota Bandung', 'kota-bandung', 12),
('Kota Bekasi', 'kota-bekasi', 12),
('Kota Depok', 'kota-depok', 12),
('Kota Bogor', 'kota-bogor', 12),
('Kota Cimahi', 'kota-cimahi', 12),
('Kota Tasikmalaya', 'kota-tasikmalaya', 12),
('Kota Cirebon', 'kota-cirebon', 12),
('Kota Sukabumi', 'kota-sukabumi', 12),
('Kota Banjar', 'kota-banjar', 12),
-- Kabupaten
('Kab. Bandung', 'kab-bandung', 12),
('Kab. Bandung Barat', 'kab-bandung-barat', 12),
('Kab. Bekasi', 'kab-bekasi', 12),
('Kab. Bogor', 'kab-bogor', 12),
('Kab. Tasikmalaya', 'kab-tasikmalaya', 12),
('Kab. Cirebon', 'kab-cirebon', 12),
('Kab. Sukabumi', 'kab-sukabumi', 12),
('Kab. Ciamis', 'kab-ciamis', 12),
('Kab. Cianjur', 'kab-cianjur', 12),
('Kab. Garut', 'kab-garut', 12),
('Kab. Indramayu', 'kab-indramayu', 12),
('Kab. Karawang', 'kab-karawang', 12),
('Kab. Kuningan', 'kab-kuningan', 12),
('Kab. Majalengka', 'kab-majalengka', 12),
('Kab. Pangandaran', 'kab-pangandaran', 12),
('Kab. Purwakarta', 'kab-purwakarta', 12),
('Kab. Subang', 'kab-subang', 12),
('Kab. Sumedang', 'kab-sumedang', 12),

-- ── Banten (13) ──────────────────────────────────────────
-- Kota
('Kota Serang', 'kota-serang', 13),
('Kota Tangerang', 'kota-tangerang', 13),
('Cilegon', 'cilegon', 13),
('Tangerang Selatan', 'tangerang-selatan', 13),
-- Kabupaten
('Kab. Serang', 'kab-serang', 13),
('Kab. Tangerang', 'kab-tangerang', 13),
('Kab. Lebak', 'kab-lebak', 13),
('Kab. Pandeglang', 'kab-pandeglang', 13),

-- ── Jawa Tengah (14) ─────────────────────────────────────
-- Kota
('Kota Semarang', 'kota-semarang', 14),
('Kota Surakarta', 'kota-surakarta', 14),
('Kota Magelang', 'kota-magelang', 14),
('Kota Pekalongan', 'kota-pekalongan', 14),
('Kota Tegal', 'kota-tegal', 14),
('Salatiga', 'salatiga', 14),
-- Kabupaten
('Kab. Semarang', 'kab-semarang', 14),
('Kab. Magelang', 'kab-magelang', 14),
('Kab. Pekalongan', 'kab-pekalongan', 14),
('Kab. Tegal', 'kab-tegal', 14),
('Kab. Banyumas', 'kab-banyumas', 14),
('Kab. Cilacap', 'kab-cilacap', 14),
('Kab. Purbalingga', 'kab-purbalingga', 14),
('Kab. Banjarnegara', 'kab-banjarnegara', 14),
('Kab. Kebumen', 'kab-kebumen', 14),
('Kab. Purworejo', 'kab-purworejo', 14),
('Kab. Wonosobo', 'kab-wonosobo', 14),
('Kab. Boyolali', 'kab-boyolali', 14),
('Kab. Klaten', 'kab-klaten', 14),
('Kab. Sukoharjo', 'kab-sukoharjo', 14),
('Kab. Wonogiri', 'kab-wonogiri', 14),
('Kab. Karanganyar', 'kab-karanganyar', 14),
('Kab. Sragen', 'kab-sragen', 14),
('Kab. Grobogan', 'kab-grobogan', 14),
('Kab. Blora', 'kab-blora', 14),
('Kab. Rembang', 'kab-rembang', 14),
('Kab. Pati', 'kab-pati', 14),
('Kab. Kudus', 'kab-kudus', 14),
('Kab. Jepara', 'kab-jepara', 14),
('Kab. Demak', 'kab-demak', 14),
('Kab. Temanggung', 'kab-temanggung', 14),
('Kab. Kendal', 'kab-kendal', 14),
('Kab. Batang', 'kab-batang', 14),
('Kab. Pemalang', 'kab-pemalang', 14),
('Kab. Brebes', 'kab-brebes', 14),

-- ── DI Yogyakarta (15) ───────────────────────────────────
-- Kota
('Kota Yogyakarta', 'kota-yogyakarta', 15),
-- Kabupaten
('Kab. Sleman', 'kab-sleman', 15),
('Kab. Bantul', 'kab-bantul', 15),
('Kab. Gunungkidul', 'kab-gunungkidul', 15),
('Kab. Kulonprogo', 'kab-kulonprogo', 15),

-- ── Jawa Timur (16) ──────────────────────────────────────
-- Kota
('Kota Surabaya', 'kota-surabaya', 16),
('Kota Malang', 'kota-malang', 16),
('Kota Kediri', 'kota-kediri', 16),
('Kota Blitar', 'kota-blitar', 16),
('Kota Madiun', 'kota-madiun', 16),
('Kota Mojokerto', 'kota-mojokerto', 16),
('Kota Pasuruan', 'kota-pasuruan', 16),
('Kota Probolinggo', 'kota-probolinggo', 16),
('Kota Batu', 'kota-batu', 16),
-- Kabupaten
('Kab. Malang', 'kab-malang', 16),
('Kab. Kediri', 'kab-kediri', 16),
('Kab. Blitar', 'kab-blitar', 16),
('Kab. Madiun', 'kab-madiun', 16),
('Kab. Mojokerto', 'kab-mojokerto', 16),
('Kab. Pasuruan', 'kab-pasuruan', 16),
('Kab. Probolinggo', 'kab-probolinggo', 16),
('Kab. Sidoarjo', 'kab-sidoarjo', 16),
('Kab. Gresik', 'kab-gresik', 16),
('Kab. Lamongan', 'kab-lamongan', 16),
('Kab. Tuban', 'kab-tuban', 16),
('Kab. Bojonegoro', 'kab-bojonegoro', 16),
('Kab. Ngawi', 'kab-ngawi', 16),
('Kab. Magetan', 'kab-magetan', 16),
('Kab. Ponorogo', 'kab-ponorogo', 16),
('Kab. Pacitan', 'kab-pacitan', 16),
('Kab. Trenggalek', 'kab-trenggalek', 16),
('Kab. Tulungagung', 'kab-tulungagung', 16),
('Kab. Nganjuk', 'kab-nganjuk', 16),
('Kab. Jombang', 'kab-jombang', 16),
('Kab. Lumajang', 'kab-lumajang', 16),
('Kab. Jember', 'kab-jember', 16),
('Kab. Banyuwangi', 'kab-banyuwangi', 16),
('Kab. Bondowoso', 'kab-bondowoso', 16),
('Kab. Situbondo', 'kab-situbondo', 16),
('Kab. Sampang', 'kab-sampang', 16),
('Kab. Pamekasan', 'kab-pamekasan', 16),
('Kab. Sumenep', 'kab-sumenep', 16),
('Kab. Bangkalan', 'kab-bangkalan', 16),

-- ── Bali (17) ────────────────────────────────────────────
-- Kota
('Denpasar', 'denpasar', 17),
-- Kabupaten
('Kab. Badung', 'kab-badung', 17),
('Kab. Gianyar', 'kab-gianyar', 17),
('Kab. Tabanan', 'kab-tabanan', 17),
('Kab. Buleleng', 'kab-buleleng', 17),
('Kab. Jembrana', 'kab-jembrana', 17),
('Kab. Klungkung', 'kab-klungkung', 17),
('Kab. Bangli', 'kab-bangli', 17),
('Kab. Karangasem', 'kab-karangasem', 17),

-- ── Nusa Tenggara Barat (18) ─────────────────────────────
-- Kota
('Mataram', 'mataram', 18),
('Kota Bima', 'kota-bima', 18),
-- Kabupaten
('Kab. Lombok Barat', 'kab-lombok-barat', 18),
('Kab. Lombok Tengah', 'kab-lombok-tengah', 18),
('Kab. Lombok Timur', 'kab-lombok-timur', 18),
('Kab. Lombok Utara', 'kab-lombok-utara', 18),
('Kab. Sumbawa', 'kab-sumbawa', 18),
('Kab. Sumbawa Barat', 'kab-sumbawa-barat', 18),
('Kab. Dompu', 'kab-dompu', 18),
('Kab. Bima', 'kab-bima', 18),

-- ── Nusa Tenggara Timur (19) ─────────────────────────────
-- Kota
('Kota Kupang', 'kota-kupang', 19),
-- Kabupaten
('Kab. Kupang', 'kab-kupang', 19),
('Kab. Timor Tengah Selatan', 'kab-tts', 19),
('Kab. Timor Tengah Utara', 'kab-ttu', 19),
('Kab. Belu', 'kab-belu', 19),
('Kab. Alor', 'kab-alor', 19),
('Kab. Lembata', 'kab-lembata', 19),
('Kab. Flores Timur', 'kab-flores-timur', 19),
('Kab. Sikka', 'kab-sikka', 19),
('Kab. Ende', 'kab-ende', 19),
('Kab. Ngada', 'kab-ngada', 19),
('Kab. Nagekeo', 'kab-nagekeo', 19),
('Kab. Manggarai', 'kab-manggarai', 19),
('Kab. Manggarai Barat', 'kab-manggarai-barat', 19),
('Kab. Manggarai Timur', 'kab-manggarai-timur', 19),
('Kab. Rote Ndao', 'kab-rote-ndao', 19),
('Kab. Sabu Raijua', 'kab-sabu-raijua', 19),
('Kab. Malaka', 'kab-malaka', 19),
('Kab. Sumba Barat', 'kab-sumba-barat', 19),
('Kab. Sumba Tengah', 'kab-sumba-tengah', 19),
('Kab. Sumba Timur', 'kab-sumba-timur', 19),
('Kab. Sumba Barat Daya', 'kab-sumba-barat-daya', 19),

-- ── Kalimantan Barat (20) ────────────────────────────────
-- Kota
('Pontianak', 'pontianak', 20),
('Singkawang', 'singkawang', 20),
-- Kabupaten
('Kab. Kubu Raya', 'kab-kubu-raya', 20),
('Kab. Mempawah', 'kab-mempawah', 20),
('Kab. Sambas', 'kab-sambas', 20),
('Kab. Bengkayang', 'kab-bengkayang', 20),
('Kab. Landak', 'kab-landak', 20),
('Kab. Sanggau', 'kab-sanggau', 20),
('Kab. Sekadau', 'kab-sekadau', 20),
('Kab. Sintang', 'kab-sintang', 20),
('Kab. Melawi', 'kab-melawi', 20),
('Kab. Kapuas Hulu', 'kab-kapuas-hulu', 20),
('Kab. Kayong Utara', 'kab-kayong-utara', 20),
('Kab. Ketapang', 'kab-ketapang', 20),

-- ── Kalimantan Tengah (21) ───────────────────────────────
-- Kota
('Palangkaraya', 'palangkaraya', 21),
-- Kabupaten
('Kab. Kotawaringin Barat', 'kab-kobar', 21),
('Kab. Kotawaringin Timur', 'kab-kotim', 21),
('Kab. Kapuas', 'kab-kapuas', 21),
('Kab. Barito Selatan', 'kab-barito-selatan', 21),
('Kab. Barito Utara', 'kab-barito-utara', 21),
('Kab. Barito Timur', 'kab-barito-timur', 21),
('Kab. Murung Raya', 'kab-murung-raya', 21),
('Kab. Pulang Pisau', 'kab-pulang-pisau', 21),
('Kab. Gunung Mas', 'kab-gunung-mas', 21),
('Kab. Katingan', 'kab-katingan', 21),
('Kab. Sukamara', 'kab-sukamara', 21),
('Kab. Lamandau', 'kab-lamandau', 21),
('Kab. Seruyan', 'kab-seruyan', 21),

-- ── Kalimantan Selatan (22) ──────────────────────────────
-- Kota
('Banjarmasin', 'banjarmasin', 22),
('Banjarbaru', 'banjarbaru', 22),
-- Kabupaten
('Kab. Banjar', 'kab-banjar', 22),
('Kab. Barito Kuala', 'kab-barito-kuala', 22),
('Kab. Tapin', 'kab-tapin', 22),
('Kab. Hulu Sungai Selatan', 'kab-hss', 22),
('Kab. Hulu Sungai Tengah', 'kab-hst', 22),
('Kab. Hulu Sungai Utara', 'kab-hsu', 22),
('Kab. Balangan', 'kab-balangan', 22),
('Kab. Tabalong', 'kab-tabalong', 22),
('Kab. Kotabaru', 'kab-kotabaru', 22),
('Kab. Tanah Laut', 'kab-tanah-laut', 22),
('Kab. Tanah Bumbu', 'kab-tanah-bumbu', 22),

-- ── Kalimantan Timur (23) ────────────────────────────────
-- Kota
('Samarinda', 'samarinda', 23),
('Balikpapan', 'balikpapan', 23),
('Bontang', 'bontang', 23),
-- Kabupaten
('Kab. Kutai Kartanegara', 'kab-kukar', 23),
('Kab. Kutai Timur', 'kab-kutai-timur', 23),
('Kab. Kutai Barat', 'kab-kutai-barat', 23),
('Kab. Berau', 'kab-berau', 23),
('Kab. Paser', 'kab-paser', 23),
('Kab. Penajam Paser Utara', 'kab-ppu', 23),
('Kab. Mahakam Ulu', 'kab-mahulu', 23),

-- ── Kalimantan Utara (24) ────────────────────────────────
-- Kota
('Tarakan', 'tarakan', 24),
-- Kabupaten
('Kab. Bulungan', 'kab-bulungan', 24),
('Kab. Malinau', 'kab-malinau', 24),
('Kab. Nunukan', 'kab-nunukan', 24),
('Kab. Tana Tidung', 'kab-tana-tidung', 24),

-- ── Sulawesi Utara (25) ──────────────────────────────────
-- Kota
('Manado', 'manado', 25),
('Bitung', 'bitung', 25),
('Kotamobagu', 'kotamobagu', 25),
('Tomohon', 'tomohon', 25),
-- Kabupaten
('Kab. Minahasa', 'kab-minahasa', 25),
('Kab. Minahasa Utara', 'kab-minahasa-utara', 25),
('Kab. Minahasa Selatan', 'kab-minahasa-selatan', 25),
('Kab. Minahasa Tenggara', 'kab-minahasa-tenggara', 25),
('Kab. Bolaang Mongondow', 'kab-bolmong', 25),
('Kab. Bolaang Mongondow Utara', 'kab-bolmong-utara', 25),
('Kab. Bolaang Mongondow Selatan', 'kab-bolmong-selatan', 25),
('Kab. Bolaang Mongondow Timur', 'kab-bolmong-timur', 25),
('Kab. Kepulauan Sangihe', 'kab-sangihe', 25),
('Kab. Kepulauan Sitaro', 'kab-sitaro', 25),
('Kab. Kepulauan Talaud', 'kab-talaud', 25),

-- ── Gorontalo (26) ───────────────────────────────────────
-- Kota
('Kota Gorontalo', 'kota-gorontalo', 26),
-- Kabupaten
('Kab. Gorontalo', 'kab-gorontalo', 26),
('Kab. Bone Bolango', 'kab-bone-bolango', 26),
('Kab. Pohuwato', 'kab-pohuwato', 26),
('Kab. Boalemo', 'kab-boalemo', 26),
('Kab. Gorontalo Utara', 'kab-gorontalo-utara', 26),

-- ── Sulawesi Tengah (27) ─────────────────────────────────
-- Kota
('Palu', 'palu', 27),
-- Kabupaten
('Kab. Donggala', 'kab-donggala', 27),
('Kab. Sigi', 'kab-sigi', 27),
('Kab. Parigi Moutong', 'kab-parigi-moutong', 27),
('Kab. Poso', 'kab-poso', 27),
('Kab. Morowali', 'kab-morowali', 27),
('Kab. Morowali Utara', 'kab-morowali-utara', 27),
('Kab. Tojo Una-Una', 'kab-tojo-una-una', 27),
('Kab. Banggai', 'kab-banggai', 27),
('Kab. Banggai Kepulauan', 'kab-banggai-kepulauan', 27),
('Kab. Banggai Laut', 'kab-banggai-laut', 27),
('Kab. Tolitoli', 'kab-tolitoli', 27),
('Kab. Buol', 'kab-buol', 27),

-- ── Sulawesi Barat (28) ──────────────────────────────────
-- (no kota, only kabupaten)
('Kab. Mamuju', 'kab-mamuju', 28),
('Kab. Mamuju Tengah', 'kab-mamuju-tengah', 28),
('Kab. Pasangkayu', 'kab-pasangkayu', 28),
('Kab. Polewali Mandar', 'kab-polman', 28),
('Kab. Majene', 'kab-majene', 28),
('Kab. Mamasa', 'kab-mamasa', 28),

-- ── Sulawesi Selatan (29) ────────────────────────────────
-- Kota
('Makassar', 'makassar', 29),
('Parepare', 'parepare', 29),
('Palopo', 'palopo', 29),
-- Kabupaten
('Kab. Gowa', 'kab-gowa', 29),
('Kab. Takalar', 'kab-takalar', 29),
('Kab. Jeneponto', 'kab-jeneponto', 29),
('Kab. Bantaeng', 'kab-bantaeng', 29),
('Kab. Bulukumba', 'kab-bulukumba', 29),
('Kab. Sinjai', 'kab-sinjai', 29),
('Kab. Bone', 'kab-bone', 29),
('Kab. Soppeng', 'kab-soppeng', 29),
('Kab. Wajo', 'kab-wajo', 29),
('Kab. Sidrap', 'kab-sidrap', 29),
('Kab. Pinrang', 'kab-pinrang', 29),
('Kab. Enrekang', 'kab-enrekang', 29),
('Kab. Tana Toraja', 'kab-tana-toraja', 29),
('Kab. Toraja Utara', 'kab-toraja-utara', 29),
('Kab. Luwu', 'kab-luwu', 29),
('Kab. Luwu Utara', 'kab-luwu-utara', 29),
('Kab. Luwu Timur', 'kab-luwu-timur', 29),
('Kab. Maros', 'kab-maros', 29),
('Kab. Pangkep', 'kab-pangkep', 29),
('Kab. Barru', 'kab-barru', 29),
('Kab. Kepulauan Selayar', 'kab-selayar', 29),

-- ── Sulawesi Tenggara (30) ───────────────────────────────
-- Kota
('Kendari', 'kendari', 30),
('Baubau', 'baubau', 30),
-- Kabupaten
('Kab. Konawe', 'kab-konawe', 30),
('Kab. Konawe Selatan', 'kab-konawe-selatan', 30),
('Kab. Konawe Utara', 'kab-konawe-utara', 30),
('Kab. Konawe Kepulauan', 'kab-konawe-kepulauan', 30),
('Kab. Kolaka', 'kab-kolaka', 30),
('Kab. Kolaka Utara', 'kab-kolaka-utara', 30),
('Kab. Kolaka Timur', 'kab-kolaka-timur', 30),
('Kab. Muna', 'kab-muna', 30),
('Kab. Muna Barat', 'kab-muna-barat', 30),
('Kab. Buton', 'kab-buton', 30),
('Kab. Buton Utara', 'kab-buton-utara', 30),
('Kab. Buton Selatan', 'kab-buton-selatan', 30),
('Kab. Buton Tengah', 'kab-buton-tengah', 30),
('Kab. Bombana', 'kab-bombana', 30),
('Kab. Wakatobi', 'kab-wakatobi', 30),

-- ── Maluku (31) ──────────────────────────────────────────
-- Kota
('Ambon', 'ambon', 31),
('Tual', 'tual', 31),
-- Kabupaten
('Kab. Maluku Tengah', 'kab-maluku-tengah', 31),
('Kab. Maluku Tenggara', 'kab-maluku-tenggara', 31),
('Kab. Kepulauan Tanimbar', 'kab-tanimbar', 31),
('Kab. Maluku Barat Daya', 'kab-maluku-barat-daya', 31),
('Kab. Buru', 'kab-buru', 31),
('Kab. Buru Selatan', 'kab-buru-selatan', 31),
('Kab. Seram Bagian Barat', 'kab-sbb', 31),
('Kab. Seram Bagian Timur', 'kab-sbt', 31),
('Kab. Kepulauan Aru', 'kab-aru', 31),

-- ── Maluku Utara (32) ────────────────────────────────────
-- Kota
('Ternate', 'ternate', 32),
('Tidore Kepulauan', 'tidore-kepulauan', 32),
-- Kabupaten
('Kab. Halmahera Barat', 'kab-halbar', 32),
('Kab. Halmahera Tengah', 'kab-halteng', 32),
('Kab. Halmahera Timur', 'kab-haltim', 32),
('Kab. Halmahera Selatan', 'kab-halsel', 32),
('Kab. Halmahera Utara', 'kab-halut', 32),
('Kab. Kepulauan Sula', 'kab-sula', 32),
('Kab. Pulau Morotai', 'kab-morotai', 32),
('Kab. Pulau Taliabu', 'kab-taliabu', 32),

-- ── Papua Barat (33) ─────────────────────────────────────
-- Kota
('Kota Sorong', 'kota-sorong', 33),
-- Kabupaten
('Kab. Manokwari', 'kab-manokwari', 33),
('Kab. Manokwari Selatan', 'kab-manokwari-selatan', 33),
('Kab. Sorong', 'kab-sorong', 33),
('Kab. Sorong Selatan', 'kab-sorong-selatan', 33),
('Kab. Raja Ampat', 'kab-raja-ampat', 33),
('Kab. Teluk Bintuni', 'kab-teluk-bintuni', 33),
('Kab. Teluk Wondama', 'kab-teluk-wondama', 33),
('Kab. Kaimana', 'kab-kaimana', 33),
('Kab. Fakfak', 'kab-fakfak', 33),
('Kab. Maybrat', 'kab-maybrat', 33),
('Kab. Tambraw', 'kab-tambraw', 33),
('Kab. Pegunungan Arfak', 'kab-pegunungan-arfak', 33),

-- ── Papua (34) ───────────────────────────────────────────
-- Kota
('Kota Jayapura', 'kota-jayapura', 34),
-- Kabupaten
('Kab. Jayapura', 'kab-jayapura', 34),
('Kab. Keerom', 'kab-keerom', 34),
('Kab. Sarmi', 'kab-sarmi', 34),
('Kab. Mamberamo Raya', 'kab-mamberamo-raya', 34),
('Kab. Mamberamo Tengah', 'kab-mamberamo-tengah', 34),
('Kab. Yalimo', 'kab-yalimo', 34),
('Kab. Yahukimo', 'kab-yahukimo', 34),
('Kab. Pegunungan Bintang', 'kab-pegunungan-bintang', 34),
('Kab. Tolikara', 'kab-tolikara', 34),
('Kab. Nduga', 'kab-nduga', 34),
('Kab. Lanny Jaya', 'kab-lanny-jaya', 34),
('Kab. Puncak', 'kab-puncak', 34),
('Kab. Puncak Jaya', 'kab-puncak-jaya', 34),
('Kab. Paniai', 'kab-paniai', 34),
('Kab. Dogiyai', 'kab-dogiyai', 34),
('Kab. Deiyai', 'kab-deiyai', 34),
('Kab. Intan Jaya', 'kab-intan-jaya', 34),
('Kab. Mimika', 'kab-mimika', 34),
('Kab. Nabire', 'kab-nabire', 34),
('Kab. Waropen', 'kab-waropen', 34),
('Kab. Kepulauan Yapen', 'kab-yapen', 34),
('Kab. Biak Numfor', 'kab-biak-numfor', 34),
('Kab. Supiori', 'kab-supiori', 34),
('Kab. Asmat', 'kab-asmat', 34),
('Kab. Mappi', 'kab-mappi', 34),
('Kab. Merauke', 'kab-merauke', 34),
('Kab. Boven Digoel', 'kab-boven-digoel', 34);

-- ============================================================
-- GENRES
-- ============================================================
insert into genres (name, slug) values
('Rock', 'rock'),
('Metal', 'metal'),
('Pop', 'pop'),
('Indie', 'indie'),
('Jazz', 'jazz'),
('Blues', 'blues'),
('Funk', 'funk'),
('R&B', 'rnb'),
('Hip-Hop', 'hip-hop'),
('Electronic', 'electronic'),
('Punk', 'punk'),
('Hardcore', 'hardcore'),
('Reggae', 'reggae'),
('Ska', 'ska'),
('Folk', 'folk'),
('Acoustic', 'acoustic'),
('Dangdut', 'dangdut'),
('Keroncong', 'keroncong'),
('Campursari', 'campursari'),
('Melayu', 'melayu'),
('Gospel', 'gospel'),
('Worship', 'worship'),
('Country', 'country'),
('Ambient', 'ambient'),
('Post-Rock', 'post-rock'),
('Shoegaze', 'shoegaze'),
('Alternative', 'alternative'),
('Grunge', 'grunge'),
('Progressive', 'progressive'),
('Classical', 'classical'),
('Psychedelic', 'psychedelic');
