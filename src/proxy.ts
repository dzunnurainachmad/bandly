import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { LOCALES, DEFAULT_LOCALE, type Locale } from './i18n/config'

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })
  const { pathname } = request.nextUrl

  // ── Locale detection ──────────────────────────────────────────
  if (!request.cookies.get('NEXT_LOCALE')?.value) {
    const acceptLang = request.headers.get('accept-language') ?? ''
    const preferred = acceptLang
      .split(',')
      .map((s) => s.split(';')[0].trim().slice(0, 2).toLowerCase())
      .find((lang) => LOCALES.includes(lang as Locale))
    const locale: Locale = (preferred as Locale) ?? DEFAULT_LOCALE
    response.cookies.set('NEXT_LOCALE', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 })
  }

  // ── Supabase auth ─────────────────────────────────────────────
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Auth required routes
  const isProtected =
    pathname.startsWith('/submit') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/chat') ||
    /^\/bands\/[^/]+\/edit/.test(pathname)
  if (!user && isProtected) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, is_banned')
      .eq('id', user.id)
      .single()

    // Banned user → block submit & dashboard
    if (profile?.is_banned && isProtected) {
      return NextResponse.redirect(new URL('/banned', request.url))
    }

    // Admin-only route
    if (pathname.startsWith('/admin') && profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
}
