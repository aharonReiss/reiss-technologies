import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { PostCard } from '@/components/Cards'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import type { Category, Post } from '@/payload-types'
import { getDocBySlug, getGlobal, getPayloadClient } from '@/utilities/payload'
import { absoluteURL, docPath } from '@/utilities/routes'
import { FOUNDER_NAME, buildMetadata, founderRef, jsonLd, organizationRef, shareImage } from '@/utilities/seo'

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
  const chosen = (post.relatedPosts ?? []).filter((p): p is Post => typeof p === 'object' && p._status !== 'draft')
  const payload = await getPayloadClient()
  // Articles picked in the admin first, topped up with the latest ones, so every article links on.
  const { docs: latest } = await payload.find({
    collection: 'posts',
    where: { id: { not_in: [post.id, ...chosen.map((p) => p.id)] } },
    sort: '-publishedAt',
    limit: Math.max(0, 3 - chosen.length),
    depth: 1,
    overrideAccess: false,
  })
  const related = [...chosen, ...latest].slice(0, 3)
  const { docs: services } = await payload.find({
    collection: 'services',
    sort: '_order',
    limit: 6,
    depth: 0,
    overrideAccess: false,
    select: { title: true, slug: true, excerpt: true },
  })
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
      author: founderRef(),
      publisher: organizationRef(),
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
          <p className="mt-5 mb-0 text-sm text-body/80">
            מאת{' '}
            <Link href="/about" rel="author" className="font-semibold text-ink no-underline hover:text-brand">
              {FOUNDER_NAME}
            </Link>
            , מייסד REISS DIGITAL
          </p>
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

      {services.length > 0 && (
        <nav aria-label="השירותים שלנו" className="container-site pb-16 md:pb-20">
          <div className="mx-auto max-w-[760px] rounded-card border border-line bg-white p-6 md:p-8">
            <h2 className="m-0 font-display text-xl font-extrabold tracking-tight !text-ink md:text-2xl">
              איך אנחנו יכולים לעזור<span className="text-brand">?</span>
            </h2>
            <ul className="mt-5 mb-0 grid list-none gap-0 divide-y divide-line p-0">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={docPath('services', s.slug)} className="group flex items-baseline justify-between gap-4 py-3.5 no-underline">
                    <span>
                      <span className="block font-display text-lg font-bold text-ink transition-colors group-hover:text-brand">
                        {s.title.replace(/\.$/, '')}
                      </span>
                      {s.excerpt && <span className="mt-0.5 block text-[15px] leading-relaxed text-body">{s.excerpt}</span>}
                    </span>
                    <span aria-hidden className="shrink-0 text-brand">
                      ←
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

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
  const title = post.meta?.title || post.title
  return buildMetadata({
    settings,
    // A full SEO title that already names the site is used as written.
    title: title.includes(settings.siteName || 'REISS DIGITAL') ? title : template.replace('%s', title),
    description: post.meta?.description || post.excerpt,
    path: docPath('posts', post.slug),
    image: post.meta?.image || post.heroImage,
    noIndex: post.meta?.noIndex,
    type: 'article',
  })
}
