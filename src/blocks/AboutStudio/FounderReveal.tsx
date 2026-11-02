'use client'

import React, { useRef } from 'react'

import { Media } from '@/components/Media'
import type { Media as MediaDoc } from '@/payload-types'
import { useProgress } from './useProgress'

type Props = {
  eyebrow?: string | null
  headline?: string | null
  name: string
  role?: string | null
  text?: string | null
  portrait: MediaDoc | number
}

/**
 * The founder, as an editorial reveal driven by scroll in both directions: an
 * Electric Blue panel opens from a narrow slit to its full frame, the name, set
 * very large behind the cutout, slides across it, and the portrait rises into
 * place in front. Desktop: the photograph takes the larger share of the row and
 * the copy overlaps its edge. Phones: headline, name and role, then the
 * photograph, then the copy, so the person and the words stay together.
 */
export function FounderReveal({ eyebrow, headline, name, role, text, portrait }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const paragraphs = (text ?? '').split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean)

  useProgress(
    ref,
    (p) => ref.current!.style.setProperty('--f', p.toFixed(3)),
    // 0 when the frame's top enters, 1 when its centre is a little above the middle
    (r, vh) => (vh - r.top) / (vh * 0.5 + r.height * 0.5),
  )

  return (
    <section className="bg-muted text-ink">
      <div className="container-site grid gap-y-7 pt-4 pb-16 md:grid-cols-12 md:grid-rows-[1fr_auto_auto_1fr] md:gap-x-10 md:gap-y-0 md:pt-0 md:pb-[14vh]">
        <header className="md:col-span-5 md:col-start-1 md:row-start-2">
          {eyebrow && (
            <p dir="ltr" className="m-0 text-end font-display text-xs font-bold tracking-[0.22em] text-brand md:text-sm">
              {eyebrow}
            </p>
          )}
          {headline && (
            <h2 className="mt-3 mb-0 font-display text-[clamp(2.2rem,10vw,3rem)] leading-[1] font-black tracking-[-0.045em] !text-ink md:text-[clamp(2.8rem,4.4vw,4.6rem)]">
              {headline}
            </h2>
          )}
          <p className="mt-5 mb-0 flex flex-wrap items-baseline gap-x-3 font-display">
            <span className="text-xl font-extrabold text-ink md:text-2xl">{name}</span>
            {role && <span className="text-base font-medium text-ink/60">{role}</span>}
          </p>
        </header>

        <div ref={ref} className="founder-frame relative md:col-span-7 md:col-start-6 md:row-span-4 md:row-start-1">
          <div className="founder-panel relative mx-auto aspect-[4/5] max-h-[88svh] overflow-hidden rounded-[1.75rem] bg-brand md:aspect-[7/8]">
            <p
              aria-hidden
              className="founder-name pointer-events-none absolute inset-x-0 top-[9%] m-0 font-display text-[clamp(5rem,30vw,8rem)] leading-[0.85] font-black tracking-[-0.05em] whitespace-nowrap text-white/[0.14] md:text-[min(12vw,13rem)]"
            >
              {name}
            </p>
            <div className="founder-cutout absolute inset-x-0 bottom-0 h-[90%]">
              <Media resource={portrait} fill sizes="(min-width: 768px) 55vw, 92vw" imgClassName="!object-contain !object-bottom" />
            </div>
          </div>
        </div>

        {paragraphs.length > 0 && (
          <div className="md:col-span-5 md:col-start-1 md:row-start-3 md:mt-8 md:border-t md:border-line md:pt-8">
            {paragraphs.map((t, i) => (
              <p key={i} className={`mb-0 max-w-[42ch] text-[1.0625rem] leading-[1.75] text-body md:text-lg ${i ? 'mt-4' : 'mt-0'}`}>
                {t}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
