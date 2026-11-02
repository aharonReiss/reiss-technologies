import type { Metadata } from 'next'

import type { Media, SiteSetting } from '@/payload-types'
import { absoluteURL } from './routes'

/** The 1200×630 crop when it exists, else the original upload. */
export function shareImage(m: unknown): { url: string; width?: number; height?: number; alt?: string } | null {
  if (!m || typeof m !== 'object') return null
  const media = m as Media
  const og = media.sizes?.og
  const url = og?.url || media.url
  if (!url) return null
  return {
    url: absoluteURL(url),
    width: (og?.url ? og.width : media.width) ?? undefined,
    height: (og?.url ? og.height : media.height) ?? undefined,
    alt: media.alt || undefined,
  }
}

type Args = {
  settings: SiteSetting
  /** Already formatted (template applied). */
  title: string
  description?: string | null
  path: string
  image?: unknown
  noIndex?: boolean | null
  type?: 'website' | 'article'
}

/**
 * Every public page's metadata in one shape: canonical, Open Graph and Twitter
 * cards in Hebrew, with the page image or the site's default share image.
 */
export function buildMetadata({ settings, title, description, path, image, noIndex, type = 'website' }: Args): Metadata {
  const desc = description || settings.seo?.defaultDescription || undefined
  const img = shareImage(image) ?? shareImage(settings.seo?.defaultImage)
  const images = img ? [img] : undefined
  return {
    title: { absolute: title },
    description: desc,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      locale: 'he_IL',
      siteName: settings.siteName || 'REISS DIGITAL',
      url: path,
      title,
      description: desc,
      images,
    },
    twitter: { card: img ? 'summary_large_image' : 'summary', title, description: desc, images: img ? [img.url] : undefined },
  }
}

/** JSON-LD as a script body; "<" is escaped so content can never close the tag. */
export const jsonLd = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, '\\u003c') })
