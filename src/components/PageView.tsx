import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { getDocBySlug, getGlobal } from '@/utilities/payload'
import { HOME_SLUG, absoluteURL, docPath } from '@/utilities/routes'
import { buildMetadata, jsonLd } from '@/utilities/seo'

export async function PageView({ slug }: { slug: string }) {
  const page = await getDocBySlug('pages', slug)
  if (!page) notFound()
  // Every page but home sits one level under it.
  const breadcrumb =
    slug === HOME_SLUG
      ? null
      : {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'ראשי', item: absoluteURL('/') },
            { '@type': 'ListItem', position: 2, name: page.title, item: absoluteURL(docPath('pages', slug)) },
          ],
        }
  return (
    <>
      {breadcrumb && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />}
      <RenderBlocks blocks={page.layout} />
    </>
  )
}

/** Canonical, Open Graph and Twitter metadata from the page's SEO tab and Site Settings. */
export async function pageMetadata(slug: string): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getDocBySlug('pages', slug),
    getGlobal('site-settings', 1),
  ])
  if (!page) return {}
  const template = settings.seo?.titleTemplate || '%s'
  const title = page.meta?.title || page.title
  return buildMetadata({
    settings,
    // A title that already names the site (home, or a full SEO title) is used as written.
    title: slug === HOME_SLUG || title.includes(settings.siteName || 'REISS DIGITAL') ? title : template.replace('%s', title),
    description: page.meta?.description,
    path: docPath('pages', slug),
    image: page.meta?.image,
    noIndex: page.meta?.noIndex,
  })
}
