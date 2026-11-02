import Link from 'next/link'
import React from 'react'

import { resolveHref } from '@/components/CMSLink'
import type { ServiceStackBlock as ServiceStackBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { StackMotion } from './StackMotion'

/** Card palettes, all within the approved navy / white / electric blue. */
const themes = {
  white: { card: 'bg-white text-ink', soft: 'text-ink/75', num: 'text-brand', dot: 'text-brand' },
  light: { card: 'bg-muted text-ink', soft: 'text-ink/75', num: 'text-brand', dot: 'text-brand' },
  brand: { card: 'bg-brand text-white', soft: 'text-white/88', num: 'text-white', dot: 'text-ink' },
  dark: { card: 'bg-ink-soft text-muted', soft: 'text-muted/78', num: 'text-brand', dot: 'text-brand' },
} as const

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * The services as cards that rise from below and stack, Huge-style. Each card pins
 * one strip (--S) lower than the one before, so the top of every earlier card – its
 * number and service name – stays visible as a layer. Every card also carries a
 * bottom margin of the strips below it, so all of them release at the same moment
 * and the finished stack holds briefly (the list's bottom padding, which also keeps
 * the last margin from collapsing) and then leaves upwards as one. Pinning is CSS sticky (scroll-synced
 * both ways); StackMotion only recedes the covered cards.
 */
export function ServiceStackBlock({ heading, cards, anchor }: ServiceStackBlockProps) {
  if (!cards?.length) return null
  const n = cards.length
  const title = heading.replace(/\.$/, '')

  return (
    <section id={anchor || undefined} aria-labelledby="services-heading" className="section-dark relative bg-ink pb-[4svh] md:pb-[6svh]">
      <div className="container-site pt-[12svh] pb-[6svh] md:pt-[16svh] md:pb-[8svh]">
        <h2
          id="services-heading"
          data-reveal
          className="type-display m-0 max-w-[11ch] text-[clamp(3.2rem,15vw,5.4rem)] !text-muted md:max-w-none md:text-[min(9.6vw,17svh,10rem)]"
        >
          {title}
          <span className="text-brand">.</span>
        </h2>
      </div>

      <StackMotion>
        <ol
          className="container-site m-0 list-none pb-[10svh] [--S:54px] [--T:84px] md:[--S:74px] md:[--T:100px]"
          style={{ ['--n' as string]: n - 1 }}
        >
          {cards.map((c, i) => {
            const t = themes[c.theme ?? 'white']
            const href = resolveHref(c.link)
            return (
              <li
                key={c.id ?? i}
                data-stack-card
                className="sticky motion-reduce:static"
                style={{
                  top: `calc(var(--T) + ${i} * var(--S))`,
                  marginBottom: `calc(${n - 1 - i} * var(--S) + 1rem)`,
                }}
              >
                <article
                  data-stack-face
                  className={cn(
                    'relative flex origin-top flex-col overflow-hidden rounded-[1.4rem] px-5 shadow-[0_-24px_60px_-28px_rgb(0_0_0/0.7)] md:rounded-[2rem] md:px-[clamp(2.5rem,4vw,4.5rem)]',
                    // Uniform height so the layers line up; shorter than the screen, and it
                    // leaves room for the strips of the cards above.
                    'h-[min(calc(100svh-var(--T)-var(--n)*var(--S)-14px),31rem)] md:h-[min(calc(100svh-var(--T)-var(--n)*var(--S)-26px),37rem)]',
                    'motion-reduce:h-auto motion-reduce:pb-8',
                    t.card,
                  )}
                >
                  {/* The strip that stays visible once the next card covers this one. */}
                  <div className="flex h-[var(--S)] shrink-0 items-center justify-between gap-4">
                    <p className="m-0 font-display text-[0.95rem] font-semibold md:text-lg">{c.label}</p>
                    <p className={cn('m-0 font-display text-xs font-bold tracking-[0.12em] md:text-sm', t.num)} dir="ltr">
                      {pad(i + 1)} / {pad(n)}
                    </p>
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col pb-5 md:grid md:grid-cols-12 md:grid-rows-[1fr_auto] md:gap-x-10 md:pb-[clamp(2rem,3.5vw,3.5rem)]">
                    <h3 className="m-0 mt-[1.2svh] font-display text-[min(12.6vw,6.9svh)] leading-[0.98] font-black tracking-[-0.04em] whitespace-pre-line [text-wrap:balance] !text-current md:col-span-12 md:mt-[2svh] md:text-[min(7.6vw,12.5svh,8.75rem)] md:leading-[0.94]">
                      {c.title.replace(/\.$/, '')}
                      <span className={t.dot}>.</span>
                    </h3>
                    <div className="mt-[2.2svh] md:col-span-6 md:col-start-7 md:mt-0 md:self-end">
                      <p className={cn('m-0 max-w-[42ch] text-[min(4.15vw,2.3svh)] leading-[1.6] md:text-[min(1.3vw,2.3svh)]', t.soft)}>
                        {c.description}
                      </p>
                      {href && (
                        <Link
                          href={href}
                          className="group mt-1.5 inline-flex min-h-11 items-center gap-2 font-display text-[0.95rem] font-bold underline-offset-[6px] hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:mt-3 md:text-base"
                        >
                          {c.link?.label || 'לפרטים'}
                          <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transition-none">
                            ←
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                  {/* Darkens a card slightly as cards stack over it (StackMotion). */}
                  <span aria-hidden data-stack-shade className="pointer-events-none absolute inset-0 bg-ink opacity-0" />
                </article>
              </li>
            )
          })}
        </ol>
      </StackMotion>
    </section>
  )
}
