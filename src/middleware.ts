import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

import { LANG_HEADER_KEY } from './payload/utilities/constants'

export function middleware(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams
  const lang = queryParams.get(LANG_HEADER_KEY)

  if (lang) {
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set(LANG_HEADER_KEY, lang)

    const response = NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    })
    return response
  }
  return NextResponse.next()
}

// Apply middleware to all cv routes
export const config = {
  matcher: '/cv/:path*',
}
