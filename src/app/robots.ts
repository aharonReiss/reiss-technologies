import type { MetadataRoute } from 'next'

import { absoluteURL } from '@/utilities/routes'

export default function robots(): MetadataRoute.Robots {
  return {
    // Media files live under /api/media and must stay crawlable (share cards, image search).
    rules: { userAgent: '*', allow: ['/', '/api/media/'], disallow: ['/admin', '/api/', '/onboarding/'] },
    sitemap: absoluteURL('/sitemap.xml'),
  }
}
