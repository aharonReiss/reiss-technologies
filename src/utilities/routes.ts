/**
 * Single source of truth for how a document maps to a public URL.
 * Used by links, sitemap, SEO canonicals, live preview and redirects.
 */
export type LinkableCollection = 'pages' | 'services' | 'projects' | 'posts'

export const linkableCollections: LinkableCollection[] = ['pages', 'services', 'projects', 'posts']

export const collectionPrefix: Record<LinkableCollection, string> = {
  pages: '',
  services: '/services',
  projects: '/projects',
  posts: '/blog',
}

export const HOME_SLUG = 'home'

/**
 * Collections whose documents have their own public page. Links to a document
 * of any other collection go to the collection's index instead of a 404 – flip
 * the flag once its detail route exists.
 */
export const hasDetailPage: Record<Exclude<LinkableCollection, 'pages'>, boolean> = {
  projects: true,
  services: false,
  posts: true,
}

/** Index page of each collection, used while its documents have no page of their own. */
const collectionIndex: Record<Exclude<LinkableCollection, 'pages'>, string> = {
  projects: '/projects',
  services: '/services',
  posts: '/blog',
}

export function docPath(collection: string, slug?: string | null): string {
  if (!slug) return '/'
  if (collection === 'pages') return slug === HOME_SLUG ? '/' : `/${slug}`
  // A service is a row on the services page; its slug is the row's anchor.
  if (collection === 'services') return `${collectionIndex.services}#${slug}`
  if (hasDetailPage[collection as keyof typeof hasDetailPage] === false) {
    return collectionIndex[collection as keyof typeof collectionIndex]
  }
  const prefix = collectionPrefix[collection as LinkableCollection] ?? ''
  return `${prefix}/${slug}`
}

export function getServerURL(): string {
  const url =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000')
  return url.replace(/\/$/, '')
}

export function absoluteURL(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  return `${getServerURL()}${path.startsWith('/') ? path : `/${path}`}`
}

/** Keeps Hebrew/Latin letters and digits; everything else becomes a dash. */
export function slugify(value?: string | null): string | undefined {
  if (!value) return undefined
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}
