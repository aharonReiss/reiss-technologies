import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { CaseStudyMotion } from '@/components/CaseStudyMotion'
import { Media } from '@/components/Media'
import { PhonePreview } from '@/components/PhonePreview'
import { RichText } from '@/components/RichText'
import type { Media as MediaDoc, Project, Service } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { getDocBySlug, getGlobal, getPayloadClient } from '@/utilities/payload'
import { absoluteURL, docPath } from '@/utilities/routes'
import { buildMetadata, jsonLd, shareImage } from '@/utilities/seo'

type Args = { params: Promise<{ slug: string }> }

const shortTitle = (title: string) => title.split(/[,،]/)[0].trim()
const displayUrl = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')
const media = (m: unknown): m is MediaDoc => Boolean(m && typeof m === 'object')
const portrait = (m: MediaDoc) => (m.height ?? 0) > (m.width ?? 0)

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    limit: 1000,
    pagination: false,
    select: { slug: true },
    overrideAccess: false,
  })
  return docs.filter((d) => d.slug).map((d) => ({ slug: d.slug! }))
}

/** The published projects before and after this one in the admin order (null at either end). */
async function neighbours(current: Project) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    sort: '_order',
    limit: 1000,
    pagination: false,
    depth: 0,
    select: { title: true, slug: true },
    overrideAccess: false,
  })
  const at = docs.findIndex((d) => d.id === current.id)
  return { prev: at > 0 ? docs[at - 1] : null, next: at >= 0 ? (docs[at + 1] ?? null) : null }
}

/** A thin browser bar above a capture of the live site. */
function BrowserBar({ url }: { url?: string | null }) {
  return (
    <div dir="ltr" className="flex h-8 items-center gap-1.5 border-b border-black/5 bg-white px-3.5 md:h-9">
      <span className="size-2 rounded-full bg-ink/15" />
      <span className="size-2 rounded-full bg-ink/15" />
      <span className="size-2 rounded-full bg-ink/15" />
      {url && <span className="mx-auto truncate pe-8 text-[11px] font-medium text-body/70 md:text-xs">{displayUrl(url)}</span>}
    </div>
  )
}

/**
 * Case study, one system for every project: a typographic opening with the site
 * itself, the story, the desktop site scrolling inside a pinned frame, the mobile
 * site as large screens, the details that matter and a closing that leads on.
 * Only what is entered in the CMS is shown; sections without content are left out.
 */
export default async function ProjectPage({ params }: Args) {
  const { slug } = await params
  const project = await getDocBySlug('projects', decodeURIComponent(slug))
  if (!project) notFound()

  const { prev, next } = await neighbours(project)
  const results = (project.results ?? []).filter((r) => r.value && r.label)
  // A real testimonial only; temporary ones are never shown on a case study.
  const testimonial = project.testimonial && typeof project.testimonial === 'object' && !project.testimonial.placeholder ? project.testimonial : null
  const name = shortTitle(project.title)
  const services = (project.services ?? []).filter((s): s is Service => typeof s === 'object')
  const gallery = (project.gallery ?? []).filter(media)
  const hero = [project.heroImage, project.desktopScreenshot].find(media)
  const scroll = [project.desktopScroll, project.desktopScreenshot].find(media)
  const phone = [project.mobilePreview, project.mobileScreenshot].find(media)
  const details = (project.details ?? []).map((d) => ({ ...d, images: (d.images ?? []).filter(media) }))
  const live = project.websiteUrl
  const url = absoluteURL(docPath('projects', project.slug))

  // The case study as a creative work by the studio, and its place in the site.
  const structured = [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.excerpt,
      url,
      inLanguage: 'he',
      image: shareImage(hero)?.url,
      creator: { '@id': `${absoluteURL('/')}#organization` },
      ...(live ? { sameAs: live } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'ראשי', item: absoluteURL('/') },
        { '@type': 'ListItem', position: 2, name: 'הפרויקטים שלנו', item: absoluteURL(docPath('pages', 'projects')) },
        { '@type': 'ListItem', position: 3, name, item: url },
      ],
    },
  ]

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structured)} />
      <CaseStudyMotion />

      {/* A – opening: the name, one sentence, what it is, and the site itself */}
      <header className="section-dark mt-[72px] bg-ink text-white/70">
        <div className="container-site pt-10 md:pt-[7vh]">
          <p className="cs-fade m-0 mb-5 text-sm font-semibold tracking-wide text-white/55 md:mb-6">
            <Link href={docPath('pages', 'projects')} className="text-white/55 no-underline hover:text-white">
              הפרויקטים שלנו
            </Link>
            {project.year && <span> · {project.year}</span>}
          </p>
          <h1 className="m-0 font-display text-[clamp(3.6rem,15vw,9.5rem)] leading-[0.9] font-black tracking-[-0.04em] !text-white">
            <span className="cs-line">
              <span>
                {name}
                <span className="text-brand">.</span>
              </span>
            </span>
          </h1>
          <div className="cs-fade mt-8 grid gap-8 border-t border-white/15 pt-7 md:mt-9 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-20 md:pt-7">
            <p className="m-0 max-w-[40ch] text-lg leading-[1.6] text-white/90 md:text-2xl md:leading-[1.5]">
              {project.excerpt}
            </p>
            <dl className="m-0 grid content-start gap-5 text-[15px]">
              {project.tags && project.tags.length > 0 && (
                <div>
                  <dt className="mb-1 text-xs font-semibold tracking-[0.12em] text-white/45">קטגוריה</dt>
                  <dd className="m-0 text-white/85">{project.tags.join(' · ')}</dd>
                </div>
              )}
              {services.length > 0 && (
                <div>
                  <dt className="mb-1 text-xs font-semibold tracking-[0.12em] text-white/45">מה עשינו</dt>
                  <dd className="m-0 flex flex-wrap gap-x-1 text-white/85">
                    {services.map((s, i) => (
                      <React.Fragment key={s.id}>
                        {i > 0 && <span aria-hidden>·</span>}
                        <Link href={docPath('services', s.slug)} className="text-white/85 underline decoration-white/25 underline-offset-4 hover:text-brand hover:decoration-brand">
                          {s.title.replace(/\.$/, '')}
                        </Link>
                      </React.Fragment>
                    ))}
                  </dd>
                </div>
              )}
              {live && (
                <div>
                  <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border-b border-white/50 pb-0.5 font-display font-bold text-white no-underline hover:border-brand hover:text-brand"
                  >
                    לצפייה באתר החי ↗
                  </a>
                </div>
              )}
            </dl>
          </div>
        </div>

        {hero && (
          <div className="container-site pt-10 pb-12 md:pt-12 md:pb-20">
            <div className="cs-hero-img overflow-hidden rounded-xl md:rounded-2xl">
              <Media
                resource={hero}
                priority
                sizes="(min-width: 1280px) 1240px, 100vw"
                imgClassName="block aspect-[16/10] w-full object-cover object-top"
              />
            </div>
          </div>
        )}
      </header>

      {/* B – the story */}
      {(project.challenge || project.solution) && (
        <section className="bg-muted text-ink">
          <div className="container-site grid gap-14 py-20 md:gap-24 md:py-[16vh]">
            {[
              { title: 'האתגר', body: project.challenge },
              { title: 'הפתרון', body: project.solution },
            ].map(
              (b) =>
                b.body && (
                  <div key={b.title} data-reveal className="grid gap-5 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
                    <h2 className="m-0 font-display text-[clamp(2.4rem,5.5vw,5rem)] leading-[0.95] font-extrabold tracking-[-0.03em] !text-ink">
                      {b.title}
                      <span className="text-brand">.</span>
                    </h2>
                    <RichText data={b.body} className="max-w-[52ch] text-lg leading-[1.8] text-body md:text-xl" />
                  </div>
                ),
            )}
          </div>
        </section>
      )}

      {/* B2 – the result: only numbers entered in the CMS, never made up */}
      {results.length > 0 && (
        <section aria-label="התוצאה" className="bg-muted text-ink">
          <div className="container-site pb-20 md:pb-[14vh]">
            <div data-reveal className="grid gap-5 border-t border-line pt-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 md:pt-14">
              <h2 className="m-0 font-display text-[clamp(2.4rem,5.5vw,5rem)] leading-[0.95] font-extrabold tracking-[-0.03em] !text-ink">
                התוצאה<span className="text-brand">.</span>
              </h2>
              <dl className="m-0 grid grid-cols-2 gap-x-8 gap-y-8">
                {results.map((r, i) => (
                  <div key={r.id ?? i}>
                    <dt className="sr-only">{r.label}</dt>
                    <dd className="m-0">
                      <span className="block font-display text-[clamp(2.4rem,5vw,4rem)] leading-none font-black tracking-tight text-brand" dir="auto">
                        {r.value}
                      </span>
                      <span aria-hidden className="mt-2 block text-base leading-snug text-body md:text-lg">
                        {r.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}

      {/* C – the desktop site, scrolling inside a frame that is pinned on desktop */}
      {scroll && (
        <section aria-label="האתר בדסקטופ" className="bg-muted pb-16 md:pb-0">
          <div className="container-site">
            <h2
              data-reveal
              className="m-0 border-t border-line pt-8 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold tracking-tight !text-ink"
            >
              האתר בדסקטופ<span className="text-brand">.</span>
            </h2>
          </div>
          <div data-pin className="md:h-[190vh]">
            <div className="container-site pt-8 md:sticky md:top-0 md:flex md:h-[100svh] md:items-center md:justify-center md:pt-[72px]">
              <div
                data-grow
                className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_40px_80px_-50px_rgb(13_16_32/0.45)] md:w-[min(100%,calc((100svh-9rem)*1.6))] md:rounded-2xl"
              >
                <BrowserBar url={live} />
                <div data-pan className="relative aspect-[4/5] overflow-hidden md:aspect-[16/10]">
                  <div className="will-change-transform">
                    <Media resource={scroll} sizes="(min-width: 768px) 90vw, 100vw" imgClassName="block h-auto w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* D – the mobile site: one phone with the whole site inside, explored by scrolling it */}
      {phone && (
        <section aria-label="האתר במובייל" className="section-dark overflow-hidden bg-ink text-white/70">
          <div className="container-site grid justify-items-center gap-12 py-20 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center md:justify-items-stretch md:gap-16 md:py-[14vh]">
            <div data-reveal className="justify-self-stretch">
              <h2 className="m-0 font-display text-[clamp(2.4rem,5.5vw,5rem)] leading-[0.95] font-extrabold tracking-[-0.03em] !text-white">
                גם בכף היד<span className="text-brand">.</span>
              </h2>
              {project.mobileNote && (
                <p className="mt-6 mb-0 max-w-[38ch] text-lg leading-[1.75] text-white/80">{project.mobileNote}</p>
              )}
            </div>
            <PhonePreview label={name} nextHref="#after-mobile" className="md:justify-self-center">
              <Media resource={phone} unoptimized imgClassName="block h-auto w-full" />
            </PhonePreview>
          </div>
        </section>
      )}
      {phone && <div id="after-mobile" tabIndex={-1} className="scroll-mt-20 outline-none" />}

      {/* E – details that matter: image and text alternate sides */}
      {details.length > 0 && (
        <section aria-label="פרטים שעושים את ההבדל" className="bg-muted text-ink">
          <div className="container-site grid gap-20 py-20 md:gap-[18vh] md:py-[16vh]">
            {details.map((d, i) => (
              <div key={d.id ?? i} className="grid gap-7 md:grid-cols-12 md:items-center md:gap-12">
                <div className={cn('md:col-span-7', i % 2 === 1 && 'md:order-2')}>
                  {/* A second desktop capture overlaps lower at the opposite edge; a mobile
                      capture of the same feature sits on the desktop one as a small phone. */}
                  <div className={cn('relative', d.images.length > 1 && (portrait(d.images[1]) ? 'pb-[8%]' : 'pb-[22%]'))}>
                    {d.images.map((img, j) => {
                      const phoneShot = j === 1 && portrait(img)
                      return (
                        <div
                          key={img.id}
                          data-reveal="wipe"
                          style={{ '--i': j } as React.CSSProperties}
                          className={cn(
                            'overflow-hidden rounded-xl border border-line bg-white shadow-[0_30px_60px_-40px_rgb(13_16_32/0.4)]',
                            d.kind === 'mobile' && 'mx-auto max-w-[320px] rounded-[2rem]',
                            d.images.length > 1 && !portrait(d.images[1]) && 'w-[80%]',
                            j === 1 && 'absolute end-0 bottom-0',
                            phoneShot &&
                              'end-[4%] w-[26%] rounded-[1.1rem] border-[4px] border-ink shadow-[0_30px_60px_-20px_rgb(13_16_32/0.55)] md:rounded-[1.6rem] md:border-[6px]',
                          )}
                        >
                          <Media
                            resource={img}
                            sizes={phoneShot ? '(min-width: 768px) 15vw, 30vw' : '(min-width: 768px) 55vw, 100vw'}
                            imgClassName="block h-auto w-full"
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div data-reveal className={cn('md:col-span-5', i % 2 === 1 && 'md:order-1')}>
                  <span dir="ltr" className="font-display text-sm font-bold tracking-[0.12em] text-brand">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 mb-0 font-display text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.02] font-extrabold tracking-[-0.025em] !text-ink">
                    {d.title}
                    <span className="text-brand">.</span>
                  </h3>
                  <p className="mt-5 mb-0 max-w-[40ch] text-lg leading-[1.75] text-body">{d.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="bg-muted pb-20 md:pb-[12vh]">
          <div className="container-site grid gap-4 md:grid-cols-2 md:gap-6">
            {gallery.map((m, i) => (
              <Media
                key={i}
                resource={m}
                className="overflow-hidden rounded-2xl"
                imgClassName="h-auto w-full"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            ))}
          </div>
        </section>
      )}

      <RenderBlocks blocks={project.layout} />

      {/* The client's own words, when there is a real testimonial for this project */}
      {testimonial && (
        <section aria-label="מה הלקוח אומר" className="bg-muted text-ink">
          <figure data-reveal className="container-site m-0 py-20 md:py-[14vh]">
            <blockquote className="m-0 max-w-[30ch] font-display text-[clamp(1.6rem,3.4vw,2.9rem)] leading-[1.25] font-bold tracking-tight text-ink">
              <span aria-hidden className="text-brand">״</span>
              {testimonial.quote}
              <span aria-hidden className="text-brand">״</span>
            </blockquote>
            <figcaption className="mt-6 text-base text-body md:text-lg">
              <span className="font-semibold text-ink">{testimonial.name}</span>
              {(testimonial.role || testimonial.company) && <span>, {[testimonial.role, testimonial.company].filter(Boolean).join(', ')}</span>}
            </figcaption>
          </figure>
        </section>
      )}

      {/* F – closing: the live site, the conversation, the next project */}
      <footer className="section-dark bg-ink text-white/70">
        <div className="container-site py-20 md:py-[16vh]">
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-20 flex flex-wrap items-baseline justify-between gap-4 border-y border-white/15 py-7 text-white no-underline md:mb-[14vh] md:py-9"
            >
              <span className="font-display text-[clamp(1.6rem,3.2vw,2.75rem)] font-extrabold tracking-tight transition-colors group-hover:text-brand">
                לצפייה באתר החי ↗
              </span>
              <span dir="ltr" className="text-sm text-white/55 md:text-base">
                {displayUrl(live)}
              </span>
            </a>
          )}

          <h2 className="m-0 font-display text-[clamp(2.8rem,8.5vw,8rem)] leading-[0.95] font-black tracking-[-0.04em] !text-white">
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-reveal="mask" suppressHydrationWarning className="block">
                אהבתם את מה
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-reveal="mask" suppressHydrationWarning style={{ '--i': 1 } as React.CSSProperties} className="block">
                שראיתם<span className="text-brand">?</span>
              </span>
            </span>
          </h2>
          <div data-reveal className="mt-8 flex flex-col gap-7 md:mt-10 md:flex-row md:items-center md:justify-between">
            <p className="m-0 max-w-[34ch] text-lg leading-[1.6] text-white/85 md:text-2xl">
              בואו נבנה משהו שעובד גם בשביל העסק שלכם.
            </p>
            <Link href={docPath('pages', 'contact')} className="btn btn-accent max-md:w-full max-md:justify-center">
              בואו נדבר
            </Link>
          </div>

          <nav aria-label="ניווט בין פרויקטים" className="mt-20 border-t border-white/15 pt-10 md:mt-[14vh]">
            {/* After the last project the way on is back to the whole portfolio. */}
            <Link
              href={next ? docPath('projects', next.slug) : docPath('pages', 'projects')}
              className="group block text-white no-underline"
            >
              <span className="block text-sm font-semibold tracking-wide text-white/55">
                {next ? 'הפרויקט הבא' : 'ראיתם את כולם'}
              </span>
              <span className="type-display mt-4 block text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.95] text-white transition-colors group-hover:text-brand">
                {next ? shortTitle(next.title) : 'לכל הפרויקטים'} ←
              </span>
            </Link>
            {/* The way back: the previous project, small, and the whole portfolio. */}
            <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 text-base">
              {prev ? (
                <Link href={docPath('projects', prev.slug)} className="text-white/70 no-underline hover:text-brand">
                  → הפרויקט הקודם: <span className="font-semibold text-white">{shortTitle(prev.title)}</span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link href={docPath('pages', 'projects')} className="text-white/70 no-underline hover:text-brand">
                  לכל הפרויקטים ←
                </Link>
              )}
            </div>
          </nav>
        </div>
      </footer>
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const [project, settings] = await Promise.all([
    getDocBySlug('projects', decodeURIComponent(slug)),
    getGlobal('site-settings', 1),
  ])
  if (!project) return {}
  const template = settings.seo?.titleTemplate || '%s'
  return buildMetadata({
    settings,
    title: template.replace('%s', project.meta?.title || shortTitle(project.title)),
    description: project.meta?.description || project.excerpt,
    path: docPath('projects', project.slug),
    image: project.meta?.image || project.heroImage || project.desktopScreenshot,
    noIndex: project.meta?.noIndex,
    type: 'article',
  })
}
