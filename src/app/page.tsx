import Link from 'next/link'
import { Music2, MapPin, Guitar, Users } from 'lucide-react'
import { getGenres } from '@/lib/queries'

const FEATURED_SLUGS = ['rock', 'metal', 'indie', 'jazz', 'pop', 'dangdut', 'reggae', 'electronic', 'folk', 'punk']

export default async function Home() {
  const allGenres = await getGenres()
  const genres = allGenres.filter((g) => FEATURED_SLUGS.includes(g.slug))
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Music2 className="w-12 h-12 opacity-80" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Temukan Band &amp; Musisi<br />di Seluruh Indonesia
          </h1>
          <p className="text-indigo-100 text-lg mb-8 max-w-xl mx-auto">
            Jelajahi ratusan band dan project musik dari Sabang sampai Merauke.
            Filter berdasarkan provinsi, kota, dan genre favoritmu.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/browse"
              className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Jelajahi Band
            </Link>
            <Link
              href="/submit"
              className="border-2 border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              Daftarkan Band Kamu
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid sm:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
            <MapPin className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="font-bold text-lg mb-1">Filter Lokasi</h3>
          <p className="text-gray-500 text-sm">
            Cari band berdasarkan 34 provinsi dan ratusan kota di Indonesia.
          </p>
        </div>
        <div className="text-center">
          <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Guitar className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-bold text-lg mb-1">Filter Genre</h3>
          <p className="text-gray-500 text-sm">
            Dari Rock, Metal, Jazz, Dangdut hingga Electronic — semua ada di sini.
          </p>
        </div>
        <div className="text-center">
          <div className="bg-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="font-bold text-lg mb-1">Cari Member</h3>
          <p className="text-gray-500 text-sm">
            Band yang buka lowongan member mudah ditemukan dengan filter khusus.
          </p>
        </div>
      </section>

      {/* Genre pills */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-xl font-bold mb-4">Jelajahi Genre</h2>
        <div className="flex flex-wrap gap-2">
          {genres.map((g) => (
            <Link
              key={g.id}
              href={`/browse?genre=${g.id}`}
              className="bg-white border border-gray-200 text-gray-700 px-4 py-1.5 rounded-full text-sm hover:border-indigo-400 hover:text-indigo-600 transition-colors"
            >
              {g.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
