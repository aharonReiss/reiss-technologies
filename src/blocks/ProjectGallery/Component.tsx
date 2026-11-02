import React from 'react'

import type { Media, ProjectGalleryBlock as ProjectGalleryBlockProps } from '@/payload-types'
import { getPayloadClient } from '@/utilities/payload'
import { docPath } from '@/utilities/routes'
import { ProjectGallery, type GalleryCard } from './ProjectGallery'

const media = (m: unknown): Media | null => (m && typeof m === 'object' && (m as Media).url ? (m as Media) : null)

/**
 * The portfolio: every published project, in the admin order, as image-led cards
 * on one horizontal track that vertical scroll slides sideways. Each card is a
 * plain link to its case study, so everything is in the HTML before any motion.
 */
export async function ProjectGalleryBlock({ heading, intro, anchor }: ProjectGalleryBlockProps) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    sort: '_order',
    limit: 100,
    pagination: false,
    depth: 1,
    overrideAccess: false,
    select: { title: true, slug: true, excerpt: true, tags: true, coverImage: true, galleryWide: true, galleryTall: true },
  })

  const cards: GalleryCard[] = docs.flatMap((p) => {
    // The card is portrait: the mobile gallery image, else the desktop one, else the cover.
    const tall = media(p.galleryTall) ?? media(p.galleryWide) ?? media(p.coverImage)
    if (!p.slug || !tall) return []
    return [
      {
        id: p.id,
        title: p.title.split(/[,،]/)[0].trim(),
        // The excerpt's lead clause (before the colon) is the one-line description.
        text: p.excerpt.split(/[:：]/)[0].trim(),
        label: (p.tags ?? []).slice(0, 2).join(' · '),
        href: docPath('projects', p.slug),
        tall,
      },
    ]
  })

  return <ProjectGallery id={anchor || undefined} heading={heading} intro={intro ?? null} cards={cards} />
}
