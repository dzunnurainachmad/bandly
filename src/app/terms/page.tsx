import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">Syarat & Ketentuan</h1>

      <div className="prose prose-stone dark:prose-invert prose-sm max-w-none space-y-6">
        <p className="text-stone-600 dark:text-stone-400">
          Terakhir diperbarui: 18 Maret 2026
        </p>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">1. Penerimaan Ketentuan</h2>
          <p className="text-stone-600 dark:text-stone-400">
            Dengan mengakses dan menggunakan BandTelusur, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini.
            Jika Anda tidak menyetujui ketentuan ini, mohon untuk tidak menggunakan layanan kami.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">2. Deskripsi Layanan</h2>
          <p className="text-stone-600 dark:text-stone-400">
            BandTelusur adalah platform direktori band Indonesia yang memungkinkan pengguna untuk mendaftarkan band,
            mencari band berdasarkan lokasi dan genre, serta menghubungkan musisi di seluruh Indonesia.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">3. Akun Pengguna</h2>
          <ul className="list-disc pl-5 text-stone-600 dark:text-stone-400 space-y-1">
            <li>Anda bertanggung jawab untuk menjaga kerahasiaan akun dan password Anda.</li>
            <li>Anda bertanggung jawab atas semua aktivitas yang terjadi di bawah akun Anda.</li>
            <li>Anda harus memberikan informasi yang akurat dan terkini saat mendaftar.</li>
            <li>Anda harus berusia minimal 13 tahun untuk menggunakan layanan ini.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">4. Konten Pengguna</h2>
          <ul className="list-disc pl-5 text-stone-600 dark:text-stone-400 space-y-1">
            <li>Anda memiliki hak atas konten yang Anda unggah (foto, bio, informasi band).</li>
            <li>Dengan mengunggah konten, Anda memberikan BandTelusur lisensi non-eksklusif untuk menampilkan konten tersebut di platform.</li>
            <li>Konten yang melanggar hukum, bersifat SARA, pornografi, atau merugikan pihak lain dilarang keras.</li>
            <li>BandTelusur berhak menghapus konten yang melanggar ketentuan tanpa pemberitahuan sebelumnya.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">5. Penggunaan yang Dilarang</h2>
          <p className="text-stone-600 dark:text-stone-400">Anda dilarang untuk:</p>
          <ul className="list-disc pl-5 text-stone-600 dark:text-stone-400 space-y-1">
            <li>Mendaftarkan band palsu atau informasi yang menyesatkan.</li>
            <li>Menggunakan platform untuk spam, penipuan, atau kegiatan ilegal.</li>
            <li>Mengakses atau mencoba mengakses akun pengguna lain tanpa izin.</li>
            <li>Melakukan scraping atau pengambilan data secara otomatis tanpa izin.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">6. Privasi</h2>
          <p className="text-stone-600 dark:text-stone-400">
            Informasi yang Anda berikan (email, data band) akan digunakan sesuai dengan tujuan platform.
            Kami tidak akan menjual data pribadi Anda kepada pihak ketiga.
            Nomor WhatsApp dan informasi kontak yang Anda cantumkan akan ditampilkan secara publik di profil band.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">7. Fitur AI</h2>
          <p className="text-stone-600 dark:text-stone-400">
            BandTelusur menggunakan teknologi AI untuk fitur seperti pembuatan bio dan pencarian band.
            Hasil yang dihasilkan AI bersifat saran dan dapat diedit oleh pengguna.
            BandTelusur tidak bertanggung jawab atas keakuratan konten yang dihasilkan AI.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">8. Pembatasan Tanggung Jawab</h2>
          <p className="text-stone-600 dark:text-stone-400">
            BandTelusur disediakan &quot;sebagaimana adanya&quot; tanpa jaminan apapun.
            Kami tidak bertanggung jawab atas kerugian yang timbul dari penggunaan platform,
            termasuk namun tidak terbatas pada kehilangan data atau gangguan layanan.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">9. Perubahan Ketentuan</h2>
          <p className="text-stone-600 dark:text-stone-400">
            BandTelusur berhak mengubah syarat dan ketentuan ini sewaktu-waktu.
            Perubahan akan berlaku segera setelah dipublikasikan di halaman ini.
            Penggunaan berkelanjutan setelah perubahan berarti Anda menyetujui ketentuan yang diperbarui.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">10. Kontak</h2>
          <p className="text-stone-600 dark:text-stone-400">
            Jika Anda memiliki pertanyaan mengenai syarat dan ketentuan ini,
            silakan hubungi kami melalui email di support@bandtelusur.id.
          </p>
        </section>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-sm text-amber-700 dark:text-amber-500 hover:text-amber-800 dark:hover:text-amber-400 transition-colors">
          &larr; Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}
