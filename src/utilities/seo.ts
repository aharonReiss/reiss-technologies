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
  // The site-wide fallback repeats on every such page; Google treats them as duplicates.
  if (!description && process.env.NODE_ENV !== 'production') {
    console.warn(`[seo] ${path} has no description of its own (SEO tab in the admin)`)
  }
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

/** The studio and its founder as structured-data references; both nodes are defined once in SiteScripts. */
export const FOUNDER_NAME = 'אהרן רייס'
export const organizationRef = () => ({ '@id': `${absoluteURL('/')}#organization` })
export const founderRef = () => ({ '@id': `${absoluteURL('/')}#founder` })

/** FAQPage structured data for questions shown on the page, answers as plain text. */
export function faqJsonLd(items: { question: string; answer: string }[]) {
  const list = items.filter((f) => f.question && f.answer)
  if (list.length === 0) return null
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  })
}
