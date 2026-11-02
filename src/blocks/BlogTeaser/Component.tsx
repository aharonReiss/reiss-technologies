import React from 'react'

import { PostCard } from '@/components/Cards'
import { CMSLink } from '@/components/CMSLink'
import { Section, SectionHeader } from '@/components/Section'
import type { BlogTeaserBlock as BlogTeaserBlockProps } from '@/payload-types'
import { getPayloadClient } from '@/utilities/payload'

export async function BlogTeaserBlock({
  eyebrow,
  heading,
  intro,
  limit,
  category,
  showLink,
  link,
  background,
  anchor,
}: BlogTeaserBlockProps) {
  const payload = await getPayloadClient()
  const categoryId = category && typeof category === 'object' ? category.id : category
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: categoryId ? { categories: { in: [categoryId] } } : undefined,
    sort: '-publishedAt',
    limit: limit || 0,
    pagination: Boolean(limit),
    depth: 1,
    overrideAccess: false,
  })
  // No published articles, no section: never show an empty or placeholder blog.
  if (posts.length === 0) return null

  return (
    <Section background={background} anchor={anchor}>
      <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro}>
        {showLink && link && <CMSLink link={link} appearance="secondary" className="shrink-0" />}
      </SectionHeader>
      <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <div key={post.id} data-reveal style={{ '--i': i % 3 } as React.CSSProperties}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </Section>
  )
}
