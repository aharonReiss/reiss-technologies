import type { Metadata } from 'next'
import React from 'react'

import { PageView, pageMetadata } from '@/components/PageView'
import { getPayloadClient } from '@/utilities/payload'
import { HOME_SLUG } from '@/utilities/routes'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    limit: 1000,
    pagination: false,
    select: { slug: true },
    overrideAccess: false,
  })
  // 'projects' has its own route (it shares the segment with /projects/[slug]).
  return docs
    .filter((d) => d.slug && d.slug !== HOME_SLUG && d.slug !== 'projects')
    .map((d) => ({ slug: d.slug! }))
}

export default async function Page({ params }: Args) {
  const { slug } = await params
  return <PageView slug={decodeURIComponent(slug)} />
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  return pageMetadata(decodeURIComponent(slug))
}
