import Link from 'next/link'
import React from 'react'

import { resolveHref } from '@/components/CMSLink'
import type { AboutStudioBlock as AboutStudioBlockProps, Media, Project } from '@/payload-types'
import { docPath } from '@/utilities/routes'
import { Blueprint } from './Blueprint'
import { Experience } from './Experience'
import { FounderReveal } from './FounderReveal'
import { LanguageFlip } from './LanguageFlip'

/** "first part. *second part.*" → the starred part on its own line, in Electric Blue. */
function Split({ text, dark }: { text: string; dark?: boolean }) {
  return text.split(/\*([^*]+)\*/).map((part, i) =>
    i % 2 ? (
      <span key={i} className="block text-brand">
        {part}
      </span>
    ) : part.trim() ? (
      <span key={i} className={`block ${dark ? 'text-white' : ''}`}>
        {part}
      </span>
    ) : null,
  )
}

const isMedia = (m: unknown): m is Media => !!m && typeof m === 'object'

/**
 * The about page as one story, each part with its own kind of motion:
 * who the studio is (a page assembling on desktop and phone), the experience
 * behind it (a numeral filling with lines of code, right to left), the founder
 * (an editorial reveal), proof (a real project changing language and direction
 * as you scroll), then the invitation, in Electric Blue.
 */
export function AboutStudioBlock({ intro, experience, founder, proof, closing, anchor }: AboutStudioBlockProps) {
  const onward = [closing.primary, closing.secondary].flatMap((l) => {
    const href = l?.label ? resolveHref(l) : null
    return href ? [{ href, label: l!.label! }] : []
  })
  const project = isMedia(proof?.project) ? (proof.project as unknown as Project) : null
  const screens = (proof?.screens ?? []).flatMap((s) =>
    isMedia(s.desktop) && isMedia(s.phone) ? [{ label: s.label, desktop: s.desktop, phone: s.phone }] : [],
  )

  return (
    <div id={anchor || undefined}>
      {/* Who the studio is */}
      <section className="section-dark relative overflow-hidden bg-ink text-white/70">
        <div className="container-site grid items-center gap-8 pt-9 pb-12 md:gap-12 md:py-[9vh] lg:min-h-[calc(100svh-4rem)] lg:grid-cols-12 lg:gap-x-8 lg:py-[6vh]">
          <div className="relative z-10 lg:col-span-6 lg:row-start-1">
            {intro.eyebrow && <p className="m-0 font-display text-sm font-bold tracking-[0.04em] text-brand">{intro.eyebrow}</p>}
            <h1 className="mt-3 mb-0 font-display text-[clamp(2.5rem,11.6vw,3.5rem)] leading-[1] font-black tracking-[-0.045em] md:mt-4 md:text-[min(8vw,5rem)] lg:text-[min(4vw,9svh,3.75rem)]">
              <Split text={intro.heading} dark />
            </h1>
            {intro.text && <p className="mt-5 mb-0 max-w-[42ch] text-[1.0625rem] leading-[1.7] text-white/72 md:mt-7 md:text-xl">{intro.text}</p>}
          </div>
          <Blueprint className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:-me-[4%] xl:-me-[12%]" />
        </div>
      </section>

      {/* The experience behind it */}
      <Experience eyebrow={experience.eyebrow} years={experience.years} label={experience.label} text={experience.text} />

      {/* The person who founded it */}
      <FounderReveal {...founder} />

      {/* The work itself */}
      {proof && screens.length > 1 && (
        <LanguageFlip
          eyebrow={proof.eyebrow}
          heading={<Split text={proof.heading} dark />}
          text={proof.text}
          href={project?.slug ? docPath('projects', project.slug) : null}
          linkLabel={proof.linkLabel}
          screens={screens}
        />
      )}

      {/* Onward */}
      <section className="section-dark bg-brand text-white">
        <div className="container-site grid gap-8 py-14 md:grid-cols-12 md:items-end md:gap-x-10 md:py-[13vh]">
          <div className="md:col-span-8">
            <h2 className="m-0 font-display text-[clamp(2.2rem,10vw,3.2rem)] leading-[1.02] font-black tracking-[-0.045em] !text-white md:text-[min(5.4vw,10svh,5.6rem)]">
              {closing.heading.split(/\*([^*]+)\*/).map((p, i) => (i % 2 ? <span key={i} className="block text-ink">{p}</span> : p))}
            </h2>
            {closing.text && <p className="mt-5 mb-0 max-w-[42ch] text-[1.0625rem] leading-[1.7] text-white/85 md:text-xl">{closing.text}</p>}
          </div>
          {onward.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4 md:col-span-4 md:justify-end">
              {onward.map((l, i) =>
                i === 0 ? (
                  <Link
                    key={i}
                    href={l.href}
                    className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-8 font-display text-lg font-bold whitespace-nowrap text-ink no-underline transition-colors hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white max-[380px]:w-full"
                  >
                    {l.label}
                    <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                  </Link>
                ) : (
                  <Link
                    key={i}
                    href={l.href}
                    className="inline-flex min-h-11 items-center gap-2 font-display text-lg font-bold whitespace-nowrap text-white underline decoration-white/40 underline-offset-[6px] transition-colors hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {l.label}
                  </Link>
                ),
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
