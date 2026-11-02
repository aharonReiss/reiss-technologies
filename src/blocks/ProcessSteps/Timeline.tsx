'use client'

import React, { useEffect, useRef } from 'react'

import { ColorReveal } from '../Manifesto/ColorReveal'
import { cn } from '@/utilities/cn'

type Props = {
  heading?: string | null
  intro?: string | null
  steps: { id?: string | null; title: string; description?: string | null }[]
  outro?: { question?: string | null; words?: string | null; note?: string | null } | null
  dark: boolean
}

const clamp = (v: number) => Math.min(1, Math.max(0, v))
const pad = (n: number) => String(n).padStart(2, '0')
/** The reading line: a step counts as reached once its top passes 60% of the screen. */
const LINE = 0.6

/**
 * The process as one typographic sequence: large numbers, bold headings and a
 * thin Electric Blue line that fills between the steps as the page scrolls. Steps
 * ahead of the reading line wait in a lighter tone; the one just reached takes the
 * blue number. Plain document scroll, so it reverses on the way back up; with
 * reduced motion everything shows at full strength and the line stays full.
 */
export function ProcessTimeline({ heading, intro, steps, outro, dark }: Props) {
  const list = useRef<HTMLOListElement>(null)
  const fill = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ol = list.current!
    const items = [...ol.children] as HTMLElement[]
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ol.dataset.static = ''
      return
    }
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.innerHeight * LINE
      // The line runs from the first number to the last one.
      const first = items[0].getBoundingClientRect().top
      const last = items[items.length - 1].getBoundingClientRect().top
      fill.current!.style.transform = `scaleY(${clamp((y - first) / Math.max(1, last - first)).toFixed(4)})`
      let current = -1
      items.forEach((li, i) => {
        if (li.getBoundingClientRect().top <= y) current = i
      })
      items.forEach((li, i) => {
        li.dataset.state = i < current ? 'past' : i === current ? 'current' : 'ahead'
      })
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  const words = outro?.words?.trim()
  return (
    <div className="container-site grid gap-12 py-20 md:grid-cols-12 md:gap-x-12 md:gap-y-[12vh] md:py-[16vh]">
      {/* The column stretches to the steps' height, so the heading pins only beside them. */}
      <div className="md:col-span-5">
        <header className="md:sticky md:top-[18vh]">
          {heading && (
            <h2
              data-reveal
              className={cn(
                'type-display m-0 text-[clamp(3rem,14vw,4.6rem)] md:text-[min(6.2vw,11svh,7rem)]',
                dark ? '!text-white' : '!text-ink',
              )}
            >
              {heading.replace(/\?$/, '')}
              {heading.endsWith('?') && <span className="text-brand">?</span>}
            </h2>
          )}
          {intro && (
            <p
              data-reveal
              style={{ '--i': 1 } as React.CSSProperties}
              className={cn(
                'mt-6 mb-0 max-w-[36ch] text-lg leading-[1.7] md:mt-8 md:text-xl',
                dark ? 'text-white/75' : 'text-body',
              )}
            >
              {intro}
            </p>
          )}
        </header>
      </div>

      <ol
        ref={list}
        className="process-line relative m-0 list-none p-0 ps-12 md:col-span-7 md:ps-16"
      >
        {/* Track and fill on the reading side (right, in RTL). */}
        <span
          aria-hidden
          className={cn(
            'absolute top-3 bottom-3 start-[0.6rem] w-px md:start-[0.9rem]',
            dark ? 'bg-white/15' : 'bg-ink/12',
          )}
        >
          <span ref={fill} className="process-line-fill absolute inset-0 origin-top bg-brand" />
        </span>
        {steps.map((s, i) => (
          <li
            key={s.id ?? i}
            data-state="ahead"
            className="process-step relative pb-9 last:pb-0 md:pb-[7vh]"
          >
            <span
              aria-hidden
              className="process-dot absolute top-3 -start-12 size-[1.3rem] rounded-full border-2 border-current bg-muted md:-start-16 md:size-[1.9rem]"
            />
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-4 md:gap-x-7">
              <span
                dir="ltr"
                className="process-n font-display text-[2.6rem] leading-none font-black tracking-[-0.04em] md:text-[clamp(3.5rem,5.2vw,5.5rem)]"
              >
                {pad(i + 1)}
              </span>
              <h3
                className={cn(
                  'm-0 font-display text-[1.45rem] leading-[1.1] font-extrabold tracking-[-0.02em] md:text-[clamp(1.75rem,2.6vw,2.6rem)]',
                  dark ? '!text-white' : '!text-ink',
                )}
              >
                {s.title}
              </h3>
              {s.description && (
                <p
                  className={cn(
                    'col-start-2 mt-2 mb-0 max-w-[40ch] text-base leading-[1.6] md:mt-3 md:text-lg',
                    dark ? 'text-white/70' : 'text-body',
                  )}
                >
                  {s.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>

      {words && (
        // Behind the scenes: one line that turns Electric Blue word by word, in reading order.
        <div
          className={cn(
            'border-t pt-10 md:col-span-12 md:pt-[8vh]',
            dark ? 'border-white/15' : 'border-line',
          )}
        >
          {outro?.question && (
            <p
              data-reveal
              className={cn(
                'm-0 font-display text-lg font-semibold md:text-2xl',
                dark ? 'text-white/75' : 'text-body',
              )}
            >
              {outro.question}
            </p>
          )}
          <ColorReveal
            text={`*${words}*`}
            className="type-display mt-4 mb-0 text-[clamp(2.4rem,11.5vw,4rem)] leading-[1] md:mt-6 md:text-[min(4.7vw,5.6rem)] md:whitespace-nowrap"
          />
          {outro?.note && (
            <p
              className={cn(
                'mt-6 mb-0 max-w-[48ch] text-[0.95rem] leading-[1.6] md:mt-8 md:text-base',
                dark ? 'text-white/60' : 'text-body',
              )}
            >
              {outro.note}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
