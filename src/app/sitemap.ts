import type { MetadataRoute } from 'next'

import { getPayloadClient } from '@/utilities/payload'
import { HOME_SLUG, absoluteURL, docPath } from '@/utilities/routes'

/**
 * Every published page and case study, without the ones marked noindex. Content
 * changes refresh it with the rest of the site (src/hooks/revalidate.ts).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()
  const query = {
    limit: 1000,
    pagination: false,
    depth: 0,
    overrideAccess: false,
    where: { 'meta.noIndex': { not_equals: true } },
    select: { slug: true, updatedAt: true },
  } as const
  const [pages, projects, posts] = await Promise.all([
    payload.find({ collection: 'pages', ...query }),
    payload.find({ collection: 'projects', ...query }),
    payload.find({ collection: 'posts', ...query }),
  ])
  const hasBlogPage = pages.docs.some((d) => d.slug === 'blog')

  return [
    ...pages.docs
      .filter((d) => d.slug)
      .map((d) => ({
        url: absoluteURL(docPath('pages', d.slug)),
        lastModified: d.updatedAt,
        priority: d.slug === HOME_SLUG ? 1 : 0.8,
      })),
    ...projects.docs
      .filter((d) => d.slug)
      .map((d) => ({ url: absoluteURL(docPath('projects', d.slug)), lastModified: d.updatedAt, priority: 0.7 })),
    // The built-in /blog index, while no CMS page named "blog" stands in for it.
    ...(posts.docs.length && !hasBlogPage ? [{ url: absoluteURL('/blog'), priority: 0.6 }] : []),
    ...posts.docs
      .filter((d) => d.slug)
      .map((d) => ({ url: absoluteURL(docPath('posts', d.slug)), lastModified: d.updatedAt, priority: 0.6 })),
  ]
}
