import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { PostCard } from '@/components/Cards'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import type { Category, Post, User } from '@/payload-types'
import { getDocBySlug, getGlobal, getPayloadClient } from '@/utilities/payload'
import { absoluteURL, docPath } from '@/utilities/routes'
import { buildMetadata, jsonLd, shareImage } from '@/utilities/seo'

type Args = { params: Promise<{ slug: string }> }

const dateFormat = new Intl.DateTimeFormat('he-IL', { dateStyle: 'long' })

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    limit: 1000,
    pagination: false,
    select: { slug: true },
    overrideAccess: false,
  })
  return docs.filter((d) => d.slug).map((d) => ({ slug: d.slug! }))
}

/** An article: title, date and category, the main image, the text, related articles and the way to talk. */
export default async function PostPage({ params }: Args) {
  const { slug } = await params
  const post = await getDocBySlug('posts', decodeURIComponent(slug))
  if (!post) notFound()

  const categories = (post.categories ?? []).filter((c): c is Category => typeof c === 'object')
  const authors = (post.authors ?? []).filter((a): a is User => typeof a === 'object')
  const related = (post.relatedPosts ?? []).filter((p): p is Post => typeof p === 'object' && p._status !== 'draft')
  const url = absoluteURL(docPath('posts', post.slug))

  const structured = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.meta?.description || post.excerpt || undefined,
      url,
      mainEntityOfPage: url,
      inLanguage: 'he',
      image: shareImage(post.heroImage)?.url,
      datePublished: post.publishedAt || post.createdAt,
      dateModified: post.updatedAt,
      author: { '@id': `${absoluteURL('/')}#organization` },
      publisher: { '@id': `${absoluteURL('/')}#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'ראשי', item: absoluteURL('/') },
        { '@type': 'ListItem', position: 2, name: 'בלוג', item: absoluteURL('/blog') },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ]

  return (
    <article className="bg-muted text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structured)} />

      <header className="container-site pt-[calc(72px+3rem)] md:pt-[calc(72px+5rem)]">
        <div className="mx-auto max-w-[760px]">
          <p className="m-0 mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold">
            <Link href="/blog" className="text-body no-underline hover:text-brand">
              בלוג
            </Link>
            {categories.map((c) => (
              <span key={c.id} className="text-brand">
                {c.title}
              </span>
            ))}
            {post.publishedAt && (
              <time dateTime={post.publishedAt} className="text-body/80">
                {dateFormat.format(new Date(post.publishedAt))}
              </time>
            )}
          </p>
          <h1 className="m-0 font-display text-[clamp(2.2rem,6vw,4rem)] leading-[1.05] font-black tracking-[-0.03em] !text-ink">
            {post.title}
          </h1>
          {post.excerpt && <p className="mt-6 mb-0 text-lg leading-[1.7] text-body md:text-xl">{post.excerpt}</p>}
          {authors.length > 0 && (
            <p className="mt-5 mb-0 text-sm text-body/80">{authors.map((a) => a.name || a.email).join(' · ')}</p>
          )}
        </div>
        {post.heroImage && (
          <div className="mx-auto mt-10 max-w-[1100px] overflow-hidden rounded-xl md:mt-14 md:rounded-2xl">
            <Media
              resource={post.heroImage}
              priority
              sizes="(min-width: 1100px) 1100px, 100vw"
              imgClassName="block aspect-[16/9] w-full object-cover"
            />
          </div>
        )}
      </header>

      <div className="container-site py-12 md:py-20">
        <RichText data={post.content} className="mx-auto max-w-[760px] text-lg leading-[1.85] text-body" />
      </div>

      {related.length > 0 && (
        <section aria-label="מאמרים קשורים" className="container-site border-t border-line py-16 md:py-20">
          <h2 className="m-0 mb-10 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold tracking-tight !text-ink">
            עוד מאמרים<span className="text-brand">.</span>
          </h2>
          <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}

      <footer className="section-dark bg-ink text-white/70">
        <div className="container-site flex flex-col gap-7 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <p className="m-0 max-w-[34ch] font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.15] font-extrabold !text-white">
            רוצים אתר שעובד בשביל העסק שלכם<span className="text-brand">?</span>
          </p>
          <Link href={docPath('pages', 'contact')} className="btn btn-accent max-md:w-full max-md:justify-center">
            בואו נדבר
          </Link>
        </div>
      </footer>
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const [post, settings] = await Promise.all([
    getDocBySlug('posts', decodeURIComponent(slug)),
    getGlobal('site-settings', 1),
  ])
  if (!post) return {}
  const template = settings.seo?.titleTemplate || '%s'
  return buildMetadata({
    settings,
    title: template.replace('%s', post.meta?.title || post.title),
    description: post.meta?.description || post.excerpt,
    path: docPath('posts', post.slug),
    image: post.meta?.image || post.heroImage,
    noIndex: post.meta?.noIndex,
    type: 'article',
  })
}
