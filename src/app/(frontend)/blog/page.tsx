import type { Metadata } from 'next'
import React from 'react'

import { PostCard } from '@/components/Cards'
import { PageView, pageMetadata } from '@/components/PageView'
import { getDocBySlug, getGlobal, getPayloadClient } from '@/utilities/payload'
import { buildMetadata } from '@/utilities/seo'

/**
 * The blog index. A CMS page with the slug "blog" takes over when it exists (it
 * lives here because /blog/[slug] claims the segment); until then, every
 * published article as a grid.
 */
export default async function BlogPage() {
  if (await getDocBySlug('pages', 'blog')) return <PageView slug="blog" />

  const payload = await getPayloadClient()
  const { docs: posts } = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit: 1000,
    pagination: false,
    depth: 1,
    overrideAccess: false,
  })

  return (
    <section className="bg-muted text-ink">
      <div className="container-site pt-[calc(72px+3.5rem)] pb-20 md:pt-[calc(72px+6rem)] md:pb-[14vh]">
        <h1 className="m-0 font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.95] font-black tracking-[-0.04em] !text-ink">
          בלוג<span className="text-brand">.</span>
        </h1>
        {posts.length > 0 ? (
          <div className="mt-12 grid gap-x-6 gap-y-12 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <div key={post.id} data-reveal style={{ '--i': i % 3 } as React.CSSProperties}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-8 mb-0 text-lg">מאמרים חדשים יעלו כאן בקרוב.</p>
        )}
      </div>
    </section>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  if (await getDocBySlug('pages', 'blog')) return pageMetadata('blog')
  const settings = await getGlobal('site-settings', 1)
  const template = settings.seo?.titleTemplate || '%s'
  return buildMetadata({ settings, title: template.replace('%s', 'בלוג'), path: '/blog' })
}
