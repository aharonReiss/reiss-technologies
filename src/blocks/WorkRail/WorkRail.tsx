'use client'

import React, { useEffect, useRef } from 'react'

import { REVEAL_END } from '../Manifesto/ColorReveal'

export type WorkCard = {
  title: string
  excerpt: string
  /** One sentence for the compact mobile card. */
  summary: string
  tags: string
  /** The client's need and what we built, one sentence each. */
  need: string | null
  answer: string | null
  quote: { text: string; by: string } | null
  desktop: string | null
  mobile: string | null
  href: string | null
  tone: string
}

type Props = {
  id?: string
  heading: string
  cards: WorkCard[]
  closing: { title: string; label: string | null; href: string | null } | null
}

const NAVY = '#0d1020'
const COOL_WHITE = '#f8f9ff'
const LINE = '#dcdee5' // --color-line on Cool White
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const rgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const mix = (a: string, b: string, t: number) => {
  const A = rgb(a)
  const B = rgb(b)
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`
}
const pad = (n: number) => String(n).padStart(2, '0')
const HOLD = 0.17 // desktop: the coloured paragraph holds ~23vh (incl. the first visible dimming)

/**
 * Selected Work: the heading pins while vertical scroll drives the card track
 * sideways (RTL, so it travels right). The section is exactly as tall as the
 * travel needs, so this is plain document scroll – no hijacking, and it runs
 * the same in both directions. The card nearest the centre grows, its
 * screenshot scrolls inside the frame, and the background takes its tone.
 * With reduced motion it becomes a native horizontal scroller.
 */
export function WorkRail({ id, heading, cards, closing }: Props) {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  const counter = useRef<HTMLSpanElement>(null)
  const cursor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = root.current!
    const rail = track.current!
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      section.dataset.static = ''
      return
    }

    const items = [...rail.children] as HTMLElement[]
    const before = section.previousElementSibling
    const prev = before instanceof HTMLElement && before.hasAttribute('data-lights-off') ? before : null
    const shots = items.map((c) => [...c.querySelectorAll<HTMLElement>('[data-shot]')])
    let travel = 0
    let focus = 0
    let spacing = 1
    let frame = 0

    const centre = (el: HTMLElement) => {
      const b = el.getBoundingClientRect()
      return b.left + b.width / 2
    }
    const layout = () => {
      // The focus point is where the first card rests when the section starts, so the
      // opening project is shown at full size; the track then travels until the last
      // card reaches the same spot.
      rail.style.transform = 'none'
      focus = centre(items[0])
      spacing = items.length > 1 ? Math.abs(focus - centre(items[1])) : window.innerWidth
      travel = Math.max(0, focus - centre(items[items.length - 1]))
      // A little extra distance per pixel of travel keeps the movement unhurried.
      section.style.height = `${window.innerHeight + travel * (window.innerWidth < 768 ? 2 : 1.6)}px`
      update()
    }

    const update = () => {
      frame = 0
      const vh = window.innerHeight
      const vw = document.documentElement.clientWidth
      const r = section.getBoundingClientRect()
      if (r.bottom < -vh || r.top > vh * 2) {
        if (prev && r.top > vh) {
          prev.style.backgroundColor = ''
          prev.style.removeProperty('--color-line')
        }
        return
      }
      const p = travel ? clamp(-r.top / Math.max(1, r.height - vh)) : 0
      rail.style.transform = `translate3d(${(p * travel).toFixed(1)}px,0,0)`
      bar.current!.style.transform = `scaleX(${p.toFixed(4)})`

      let best = 0
      let bestD = Infinity
      items.forEach((card, i) => {
        const b = card.getBoundingClientRect()
        const d = Math.abs(b.left + b.width / 2 - focus) / vw
        if (d < bestD) {
          bestD = d
          best = i
        }
        card.style.transform = `scale(${(1 - 0.12 * clamp(d * 1.4)).toFixed(4)})`
        const shot = shots[i]
        // Screenshot scrolls top → bottom while its card is the active one. Desktop: as
        // the card travels right (RTL) out of focus. Phones: across the whole active range –
        // from arrival (the first card from the very start) until the next card takes over –
        // so the tall mobile captures run through several sections of the site.
        const c = b.left + b.width / 2
        const t =
          vw < 768
            ? clamp((c - (i === 0 ? focus : focus - spacing * 0.35)) / (spacing * (i === 0 ? 0.65 : 1)))
            : clamp((c - focus + (i === 0 ? 0 : vw * 0.1)) / (vw * (i === 0 ? 0.6 : 0.7)))
        const y = `50% ${(t * 100).toFixed(1)}%`
        shot.forEach((img) => (img.style.objectPosition = y))
      })

      // Lights off: this section and the light one above it share one colour that dims
      // from Cool White to Deep Navy, so the whole scene darkens instead of a navy block
      // sliding up. Desktop runs three separate scroll ranges keyed to the approach
      // paragraph: (A) it colours in, (B) it holds, fully coloured on white, for HOLD of
      // a screen, (C) only then the lights go down. Phones dim as this section rises.
      let dim = 1
      if (prev) {
        const para = vw >= 768 ? prev.querySelector('[data-color-reveal]') : null
        dim = para
          ? clamp((vh * (REVEAL_END - HOLD) - para.getBoundingClientRect().bottom) / (vh * 0.65))
          : clamp((vh * 0.85 - r.top) / (vh * 0.65))
      }
      if (prev) {
        prev.style.backgroundColor = mix(COOL_WHITE, NAVY, dim)
        prev.style.setProperty('--color-line', mix(LINE, NAVY, dim))
      }
      const tone = cards[best]?.tone ?? NAVY
      section.style.backgroundColor = r.top <= 0 ? mix(NAVY, tone, clamp(1 - bestD * 2)) : mix(COOL_WHITE, NAVY, dim)
      counter.current!.textContent = `${pad(Math.min(best + 1, cards.length))} / ${pad(cards.length)}`
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const ro = new ResizeObserver(layout)
    ro.observe(rail)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', layout)
    layout()

    // "צפייה" cursor on devices with a real pointer.
    const dot = cursor.current!
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const move = (e: PointerEvent) => {
      dot.style.translate = `${e.clientX}px ${e.clientY}px`
    }
    const on = () => dot.setAttribute('data-on', '')
    const off = () => dot.removeAttribute('data-on')
    const linked = items.filter((c) => c.hasAttribute('data-view'))
    if (fine) {
      window.addEventListener('pointermove', move, { passive: true })
      linked.forEach((c) => {
        c.addEventListener('pointerenter', on)
        c.addEventListener('pointerleave', off)
      })
    }

    return () => {
      ro.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', layout)
      window.removeEventListener('pointermove', move)
      linked.forEach((c) => {
        c.removeEventListener('pointerenter', on)
        c.removeEventListener('pointerleave', off)
      })
    }
  }, [cards])

  // Mobile: ~90% wide and as tall as the pinned stage allows. Desktop keeps its proportions.
  const cardBox =
    'relative h-[calc(100%-1.25rem)] w-[90vw] shrink-0 overflow-hidden rounded-2xl will-change-transform md:h-[min(62svh,40rem)] md:w-[min(74vw,68rem)] md:rounded-3xl'

  return (
    <section
      ref={root}
      id={id}
      aria-label={heading}
      className="work-rail section-dark relative bg-ink text-white"
    >
      <div className="work-rail-pin sticky top-0 flex h-svh flex-col overflow-hidden pt-[88px] md:pt-[104px]">
        <div className="container-site flex items-baseline justify-between gap-6">
          <h2 className="type-display m-0 text-[9vw] whitespace-nowrap !text-white md:text-[clamp(3.5rem,7.4vw,8rem)]">
            {heading}
            <span className="text-brand">.</span>
          </h2>
          <span ref={counter} dir="ltr" className="shrink-0 font-display text-sm whitespace-nowrap font-semibold tracking-[0.12em] text-white/70">
            01 / {pad(cards.length)}
          </span>
        </div>

        <div
          ref={track}
          className="work-rail-track flex min-h-0 flex-1 items-center gap-[3vw] py-2.5 md:py-0 ps-[max(1rem,calc((100vw-80rem)/2+1.5rem))] pe-[30vw] will-change-transform md:gap-[4vw]"
        >
          {cards.map((c, i) => {
            const action = 'לסיפור הפרויקט'
            // Three separate areas – identity, the website itself, a line of context – so
            // nothing sits on top of the screenshot. Desktop moves the identity under the image.
            const body = (
              <>
                <div className="flex items-baseline justify-between gap-4 px-4 pt-3.5 pb-3 md:col-start-1 md:row-start-2 md:block md:px-10 md:pt-7 md:pb-8">
                  <h3 className="m-0 font-display text-[1.375rem] leading-none font-extrabold tracking-tight !text-white md:text-[clamp(1.75rem,3.4vw,3.25rem)]">
                    {c.title}
                    <span className="text-brand">.</span>
                  </h3>
                  <span dir="ltr" className="shrink-0 font-display text-xs font-semibold tracking-[0.12em] text-white/55 md:hidden">
                    {pad(i + 1)}
                  </span>
                  {c.tags && <span className="mt-3 hidden text-sm text-white/60 md:block">{c.tags}</span>}
                </div>

                <div className="relative min-h-0 overflow-hidden max-md:mx-2 max-md:rounded-xl md:col-span-2 md:row-start-1">
                  {c.desktop && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      data-shot
                      src={c.desktop}
                      alt=""
                      loading={i < 2 ? 'eager' : 'lazy'}
                      className={`absolute inset-0 size-full object-cover object-top ${c.mobile ? 'max-md:hidden' : ''}`}
                    />
                  )}
                  {c.mobile && (
                    // Phones get the mobile screenshot itself, large and unframed.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      data-shot
                      src={c.mobile}
                      alt=""
                      loading={i < 2 ? 'eager' : 'lazy'}
                      className="absolute inset-0 size-full object-cover object-top md:hidden"
                    />
                  )}
                  {c.mobile && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={c.mobile}
                      alt=""
                      loading="lazy"
                      className="absolute top-[8%] left-[4%] hidden aspect-[9/19.5] w-[14%] rounded-[clamp(12px,2vw,28px)] border-[clamp(4px,0.5vw,7px)] border-ink object-cover object-top shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] md:block"
                    />
                  )}
                </div>

                <div className="flex items-end justify-between gap-4 px-4 pt-3 pb-4 max-md:flex-col max-md:items-start max-md:gap-2.5 md:col-start-2 md:row-start-2 md:gap-10 md:px-10 md:pt-7 md:pb-8">
                  {c.need && c.answer ? (
                    // Need → solution: what the client came with and what we built.
                    <div className="min-w-0 max-w-[60rem]">
                      <dl className="m-0 grid gap-1.5 text-[0.8125rem] leading-snug md:grid-cols-2 md:gap-8 md:text-[0.95rem] md:leading-relaxed">
                        {[
                          ['הצורך', c.need],
                          ['מה בנינו', c.answer],
                        ].map(([term, text]) => (
                          <div key={term} className="min-w-0 max-md:line-clamp-2">
                            <dt className="inline font-display font-bold text-white md:mb-1 md:block md:text-xs md:tracking-[0.12em] md:text-white/55">
                              {term}
                              <span className="md:hidden">: </span>
                            </dt>
                            <dd className="m-0 inline text-white/80 md:block md:line-clamp-2">{text}</dd>
                          </div>
                        ))}
                      </dl>
                      {c.quote && (
                        <blockquote className="m-0 mt-3 line-clamp-2 text-sm text-white/70 italic max-md:hidden">
                          ”{c.quote.text}“ <span className="not-italic text-white/50">· {c.quote.by}</span>
                        </blockquote>
                      )}
                    </div>
                  ) : (
                    <p className="m-0 line-clamp-2 max-w-[44ch] text-sm leading-snug text-white/80 md:text-base md:leading-relaxed">
                      <span className="md:hidden">{c.summary}</span>
                      <span className="max-md:hidden">{c.excerpt}</span>
                    </p>
                  )}
                  <span className="shrink-0 border-b border-white/60 pb-0.5 font-display text-sm font-bold text-white md:text-base">
                    {action} ←
                  </span>
                </div>
              </>
            )
            const frame = `${cardBox} grid grid-rows-[auto_minmax(0,1fr)_auto] border border-white/10 bg-ink/70 text-white no-underline md:grid-cols-[auto_minmax(0,1fr)] md:grid-rows-[minmax(0,1fr)_auto]`
            return c.href ? (
              <a
                key={i}
                href={c.href}
                data-view
                aria-label={`${c.title} – ${action}`}
                className={`${frame} md:cursor-none`}
              >
                {body}
              </a>
            ) : (
              <article key={i} className={frame}>
                {body}
              </article>
            )
          })}

          {closing && (
            <div className={`${cardBox} flex items-center bg-brand p-6 md:p-16`}>
              <div>
                <p className="m-0 max-w-[12ch] font-display text-[clamp(2.4rem,6.4vw,6.5rem)] leading-none font-black tracking-[-0.035em] text-white">
                  {closing.title.replace(/\?$/, '')}
                  <span className="text-ink">{closing.title.endsWith('?') ? '?' : '.'}</span>
                </p>
                {closing.href && closing.label && (
                  <a
                    href={closing.href}
                    className="mt-7 inline-flex border-b-2 border-white pb-1 font-display text-xl font-bold text-white no-underline"
                  >
                    {closing.label} ←
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="container-site pb-10 md:pb-12">
          <div className="relative h-0.5 bg-white/15">
            <span ref={bar} className="absolute inset-0 origin-right scale-x-0 bg-white" />
          </div>
        </div>
      </div>

      <div
        ref={cursor}
        aria-hidden
        className="work-cursor pointer-events-none fixed top-0 left-0 z-40 -mt-13 -ml-13 grid size-26 place-items-center rounded-full bg-muted font-display text-base font-bold text-ink"
      >
        צפייה
      </div>
    </section>
  )
}
