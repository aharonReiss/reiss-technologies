import Link from 'next/link'
import React from 'react'

import type { Media, Project, ProjectStoriesBlock as ProjectStoriesBlockProps } from '@/payload-types'
import { docPath } from '@/utilities/routes'
import { StoryMedia } from './StoryMedia'

const pad = (n: number) => String(n).padStart(2, '0')
const asMedia = (m: unknown) => (m && typeof m === 'object' ? (m as Media) : null)

/** A minimal browser window: a hairline bar, then the screen at 16:10. */
function Browser({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-[0_30px_60px_-30px_rgb(13_16_32/0.35)] ring-1 ring-ink/10">
      <div aria-hidden className="flex h-6 items-center gap-1.5 border-b border-ink/10 px-3" dir="ltr">
        <span className="size-2 rounded-full bg-ink/15" />
        <span className="size-2 rounded-full bg-ink/15" />
        <span className="size-2 rounded-full bg-ink/15" />
      </div>
      <div className="aspect-[16/10]">{children}</div>
    </div>
  )
}

/** A phone: thin navy bezel, the screen at 390:844. */
function Phone({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[1.6rem] border-[5px] border-ink bg-ink shadow-[0_30px_50px_-25px_rgb(13_16_32/0.45)] ${className}`}
    >
      <div className="aspect-[390/844] overflow-hidden rounded-[1.25rem]">{children}</div>
    </div>
  )
}

/**
 * The thinking behind the work: for each project one real decision, shown with
 * the real site. On desktop the demonstration takes about two thirds of the row
 * and its side alternates; on phones each story is a single large phone screen.
 */
export function ProjectStoriesBlock({ eyebrow, heading, intro, stories, anchor }: ProjectStoriesBlockProps) {
  const parts = heading.split(/\*([^*]+)\*/)
  return (
    <section id={anchor || undefined} className="bg-muted text-ink">
      <div className="container-site pt-16 pb-6 md:pt-[14vh] md:pb-[4vh]">
        <header className="max-w-[52rem]">
          {eyebrow && (
            <p dir="ltr" className="m-0 text-end font-display text-xs font-bold tracking-[0.22em] text-brand md:text-sm">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-4 mb-0 font-display text-[clamp(2.4rem,11vw,3.4rem)] leading-[1] font-black tracking-[-0.045em] !text-ink md:text-[min(6vw,11svh,6rem)]">
            {parts.map((p, i) => (i % 2 ? <span key={i} className="block text-brand">{p}</span> : p))}
          </h2>
          {intro && <p className="mt-5 mb-0 max-w-[46ch] text-[1.0625rem] leading-[1.7] text-body md:mt-7 md:text-xl">{intro}</p>}
        </header>

        <ol className="m-0 mt-12 list-none p-0 md:mt-[9vh]">
          {(stories ?? []).map((s, i) => {
            const project = typeof s.project === 'object' ? (s.project as Project) : null
            const href = project?.slug ? docPath('projects', project.slug) : null
            const flip = i % 2 === 1
            const desktop = asMedia(s.desktop)
            const phone = asMedia(s.phone)
            const phone2 = asMedia(s.phone2)
            const label = s.label || project?.title.split(/[,،]/)[0]
            return (
              <li key={s.id ?? i} className="border-t border-ink/15 py-12 md:py-[9vh]">
                <article className="grid gap-y-8 md:grid-cols-12 md:items-center md:gap-x-10">
                  {/* Copy: about a third of the row, on the opposite side from the demonstration. */}
                  <div className={`md:col-span-4 md:row-start-1 ${flip ? 'md:col-start-1' : 'md:col-start-9'}`}>
                    <p dir="ltr" className="m-0 text-end font-display text-sm font-bold tracking-[0.14em] text-brand">
                      {pad(i + 1)} / {label}
                    </p>
                    <h3 className="mt-3 mb-0 font-display text-[clamp(1.9rem,8.4vw,2.4rem)] leading-[1.05] font-black tracking-[-0.035em] !text-ink md:text-[clamp(2rem,2.9vw,3rem)]">
                      {s.headline}
                    </h3>
                    <p className="mt-4 mb-0 max-w-[40ch] text-base leading-[1.7] text-body md:mt-5 md:text-[1.0625rem]">{s.text}</p>
                    {href && (
                      <Link
                        href={href}
                        className="mt-6 hidden min-h-11 items-center gap-2 font-display text-base font-bold text-ink underline decoration-ink/30 underline-offset-[6px] transition-colors hover:text-brand hover:decoration-brand md:inline-flex"
                      >
                        {s.linkLabel || 'לסיפור הפרויקט המלא'}
                        <span aria-hidden>←</span>
                      </Link>
                    )}
                  </div>

                  {/* Demonstration */}
                  <div className={`md:col-span-8 md:row-start-1 ${flip ? 'md:col-start-5' : 'md:col-start-1'}`}>
                    {/* Phones: one large phone screen tells the story. */}
                    {phone && (
                      <div className="mx-auto w-[min(68vw,300px)] md:hidden">
                        <Phone>
                          <StoryMedia media={phone} poster={asMedia(s.phonePoster)} size="card" label={label} />
                        </Phone>
                      </div>
                    )}

                    {s.layout === 'phones' ? (
                      <div className="hidden items-start justify-center gap-[6%] md:flex">
                        {phone && (
                          <Phone className="w-[36%]">
                            <StoryMedia media={phone} poster={asMedia(s.phonePoster)} size="card" label={label} />
                          </Phone>
                        )}
                        {phone2 && (
                          <Phone className="mt-[12%] w-[36%]">
                            <StoryMedia media={phone2} size="card" label={label} />
                          </Phone>
                        )}
                      </div>
                    ) : (
                      <div className={`relative hidden md:block ${flip ? 'md:ps-[9%]' : 'md:pe-[9%]'}`}>
                        {desktop && (
                          <Browser>
                            <StoryMedia media={desktop} poster={asMedia(s.desktopPoster)} size="large" label={label} />
                          </Browser>
                        )}
                        {phone && (
                          <div className={`absolute -bottom-[8%] w-[23%] ${flip ? 'start-0' : 'end-0'}`}>
                            <Phone>
                              <StoryMedia media={phone} poster={asMedia(s.phonePoster)} size="card" label={label} />
                            </Phone>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {href && (
                    <Link
                      href={href}
                      className="inline-flex min-h-11 items-center gap-2 justify-self-start font-display text-base font-bold text-ink underline decoration-ink/30 underline-offset-[6px] hover:text-brand md:hidden"
                    >
                      {s.linkLabel || 'לסיפור הפרויקט המלא'}
                      <span aria-hidden>←</span>
                    </Link>
                  )}
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
