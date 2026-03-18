import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedPaths = ['/chat', '/submit', '/dashboard']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if path needs auth
  const needsAuth =
    protectedPaths.some((p) => pathname.startsWith(p)) ||
    /^\/bands\/[^/]+\/edit/.test(pathname)

  if (!needsAuth) return NextResponse.next()

  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: ['/chat', '/submit', '/dashboard/:path*', '/bands/:id/edit'],
}
