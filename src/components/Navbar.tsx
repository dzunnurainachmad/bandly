'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Music2, LogOut, LayoutDashboard, LogIn, ShieldCheck } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { useAuth } from '@/contexts/AuthContext'
import { supabaseBrowser } from '@/lib/supabase-browser'

export function Navbar() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (!user) { setIsAdmin(false); return }
    supabaseBrowser
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
      .then(({ data }) => setIsAdmin(data?.role === 'admin'))
  }, [user])

  async function handleSignOut() {
    await signOut()
    router.push('/')
    router.refresh()
  }

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? ''

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 font-bold text-indigo-600 text-lg">
            <Music2 className="w-5 h-5" />
            Bandly
          </Link>

          <div className="flex items-center gap-2 text-sm">
            <Link href="/browse" className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Jelajahi
            </Link>

            {!loading && (
              user ? (
                <>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-1.5 px-3 py-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Admin
                    </Link>
                  )}
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-1.5 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <Link
                    href="/submit"
                    className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Daftarkan Band
                  </Link>
                  <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-700">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-bold">
                      {initials}
                    </div>
                    <button
                      onClick={handleSignOut}
                      title="Keluar"
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    Masuk
                  </Link>
                  <Link
                    href="/submit"
                    className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Daftarkan Band
                  </Link>
                </>
              )
            )}

            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
