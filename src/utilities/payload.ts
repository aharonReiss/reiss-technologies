import configPromise from '@payload-config'
import { cache } from 'react'
import { getPayload } from 'payload'

import type { Config } from '@/payload-types'

export const getPayloadClient = () => getPayload({ config: configPromise })

type GlobalSlug = keyof Config['globals']

/** Globals are read on every page; `cache` dedupes them within one render. */
export const getGlobal = cache(async <T extends GlobalSlug>(slug: T, depth = 1) => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug, depth }) as Promise<Config['globals'][T]>
})

type SluggedCollection = 'pages' | 'services' | 'projects' | 'posts'

export const getDocBySlug = cache(
  async <T extends SluggedCollection>(collection: T, slug: string, depth = 2) => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection,
      where: { slug: { equals: slug } },
      limit: 1,
      depth,
      overrideAccess: false,
    })
    return (docs[0] ?? null) as Config['collections'][T] | null
  },
)
