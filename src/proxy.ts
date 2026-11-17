import { NextResponse, type NextRequest } from 'next/server'
import { Pool } from 'pg'

import { RESERVED_SLUGS, SHORT_LINK_SLUG, shortLinkTarget } from '@/utilities/shortLinks'

/**
 * Short links: /<slug> → 302 to the destination set in the admin (קישורים קצרים).
 * One query finds an active link and counts the visit; anything else falls
 * through to the site as usual (a page, or the regular 404).
 */
const globalForPool = globalThis as unknown as { shortLinksPool?: Pool }
const pool = (globalForPool.shortLinksPool ??= new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
}))

export async function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.slice(1).toLowerCase()
  if (!SHORT_LINK_SLUG.test(slug) || RESERVED_SLUGS.has(slug)) return NextResponse.next()

  let destination: string | undefined
  try {
    const { rows } = await pool.query<{ destination: string }>(
      'UPDATE short_links SET clicks = COALESCE(clicks, 0) + 1 WHERE slug = $1 AND active = true RETURNING destination',
      [slug],
    )
    destination = rows[0]?.destination
  } catch (error) {
    // A database hiccup must never take the page down: carry on to the site.
    console.error('[short-links]', error)
  }
  if (!destination) return NextResponse.next()

  const response = NextResponse.redirect(
    // Behind nginx the request's own origin can be the internal one; the site URL is not.
    shortLinkTarget(
      destination,
      process.env.NEXT_PUBLIC_SERVER_URL || request.nextUrl.origin,
      request.nextUrl.searchParams,
    ),
    302,
  )
  response.headers.set('Cache-Control', 'no-store')
  response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return response
}

/** Single-segment paths only, never files (a dot) or the admin, API and Next internals. */
export const config = {
  matcher: ['/((?!admin|api|_next|onboarding|blog/|projects/)[^/.]+)'],
}
