/**
 * Short links: reiss-dgtl.com/<slug> → a 302 to the link's destination.
 * Shared by the collection (validation) and the proxy (redirect).
 */

/** Top-level paths the site already owns. A short link may never take one. */
export const RESERVED_SLUGS = new Set([
  'admin',
  'admin-pwa',
  'api',
  'blog',
  'projects',
  'services',
  'contact',
  'about',
  'onboarding',
  'brand',
  'home',
  'next',
  '_next',
  'llms.txt',
  'robots.txt',
  'sitemap.xml',
  'favicon.ico',
  'icon.svg',
])

/** Lowercase Latin letters, digits and dashes, e.g. "ig" or "spring-sale". */
export const SHORT_LINK_SLUG = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/

/**
 * The redirect target: the destination with the visitor's query parameters added.
 * A parameter the destination already sets (a utm tag, say) keeps its value.
 */
export function shortLinkTarget(destination: string, origin: string, incoming: URLSearchParams): URL {
  const target = new URL(destination, origin)
  incoming.forEach((value, key) => {
    if (!target.searchParams.has(key)) target.searchParams.append(key, value)
  })
  return target
}
