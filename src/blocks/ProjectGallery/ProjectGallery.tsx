'use client'

import React, { useEffect, useRef } from 'react'

import { Media } from '@/components/Media'
import type { Media as MediaDoc } from '@/payload-types'

export type GalleryCard = {
  id: number
  title: string
  text: string
  label: string
  href: string
  /** 4:5, the card's whole face. */
  tall: MediaDoc
}

type Props = { id?: string; heading: string; intro: string | null; cards: GalleryCard[] }

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const pad = (n: number) => String(n).padStart(2, '0')
/**
 * The wheel, calibrated on the reference: neighbours ~8° apart on a phone and
 * ~11° on desktop, one card width plus a small gap apart along the arc, so the
 * radius is several screens wide and only a shallow slice of it is visible.
 * Must match --sp and --rest in globals.css (the first paint before JS).
 */
function geometry(W: number, cw: number) {
  const mobile = W < 768
  const spacing = cw * (mobile ? 1.08 : 1.12)
  const theta = ((mobile ? 8 : 11) * Math.PI) / 180
  // The upright place is the centre of the screen: the first project starts there.
  return { W, cw, spacing, R: spacing / theta, rest: W / 2 }
}

/**
 * The projects page: a short title, then full-bleed image cards on navy that
 * ride one large invisible wheel. While the frame is pinned, scrolling turns
 * the wheel: every card advances along the same arc, so the next project comes
 * in from the right, low and tilted, rises and straightens at the upright
 * place, and leaves to the left tilted the other way. One scroll pixel is one
 * pixel of arc, the range is (projects - 1) x spacing, and nothing snaps or
 * holds, in both directions. Without JS or with reduced motion it is a plain
 * list (CSS).
 */
export function ProjectGallery({ id, heading, intro, cards }: Props) {
  const outer = useRef<HTMLDivElement>(null)
  const view = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLOListElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  const counter = useRef<HTMLSpanElement>(null)
  const title = heading.replace(/\.$/, '')

  useEffect(() => {
    const box = outer.current!
    const port = view.current!
    const rail = track.current!
    const items = [...rail.children] as HTMLElement[]
    const n = items.length
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)')
    let g = { W: 0, cw: 0, spacing: 1, R: 1, rest: 0 }
    let travel = 0
    let active = -1
    let frame = 0
    let pin = 0

    const measure = () => {
      if (!motion.matches) {
        box.style.height = ''
        port.style.top = ''
        items.forEach((el) => {
          el.style.transform = ''
          el.style.visibility = ''
        })
        return
      }
      g = geometry(port.clientWidth, items[0].offsetWidth)
      // The arc length between neighbours is the scroll distance from one project to the next.
      travel = (n - 1) * g.spacing
      // The frame is only as tall as the counter and the cards, so it follows the intro
      // directly; it pins centred in the screen below the fixed header (72px).
      pin = Math.max(72, Math.round((window.innerHeight + 72 - port.offsetHeight) / 2))
      port.style.top = `${pin}px`
      box.style.height = `${port.offsetHeight + travel}px`
      update()
    }

    const update = () => {
      frame = 0
      if (!motion.matches) return
      const p = travel ? clamp((pin - box.getBoundingClientRect().top) / travel) : 0
      const offset = p * travel
      // One wheel: each card sits at its own arc length along the circle, all shifted by the
      // same scroll offset. Position and tilt both come from that one angle.
      items.forEach((el, k) => {
        const a = (k * g.spacing - offset) / g.R
        const x = g.rest + g.R * Math.sin(a) - g.cw / 2
        const y = g.R * (1 - Math.cos(a))
        // Far round the wheel a card would come back; it is simply out of view by then.
        el.style.visibility = Math.abs(a) > Math.PI / 3 ? 'hidden' : ''
        el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${((a * 180) / Math.PI).toFixed(2)}deg)`
      })
      if (bar.current) bar.current.style.transform = `scaleX(${n > 1 ? p : 1})`
      const i = Math.round(p * (n - 1))
      if (i !== active) {
        active = i
        if (counter.current) counter.current.textContent = pad(i + 1)
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    // A card reached by keyboard is turned to the upright place by scrolling the page.
    const onFocus = (e: FocusEvent) => {
      if (!motion.matches || !travel) return
      const k = items.findIndex((el) => el.contains(e.target as Node))
      if (k < 0) return
      const top = box.getBoundingClientRect().top + window.scrollY - pin + k * g.spacing
      window.scrollTo({ top, behavior: 'instant' })
    }

    const ro = new ResizeObserver(measure)
    ro.observe(rail)
    ro.observe(port)
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    motion.addEventListener('change', measure)
    rail.addEventListener('focusin', onFocus)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      motion.removeEventListener('change', measure)
      rail.removeEventListener('focusin', onFocus)
    }
  }, [cards.length])

  return (
    <section
      id={id}
      className="pg section-dark overflow-x-clip bg-ink text-white/70"
      style={{ '--n': cards.length } as React.CSSProperties}
    >
      <header className="container-site pt-[calc(72px+2rem)] md:pt-[calc(72px+7vh)]">
        <h1 className="m-0 font-display text-[clamp(3rem,15vw,4.4rem)] leading-[0.95] font-black tracking-[-0.045em] !text-white md:text-[min(8vw,14svh,8.5rem)]">
          {title}
          <span className="text-brand">.</span>
        </h1>
        {intro && (
          <p className="mt-4 mb-0 max-w-[34ch] text-[1.0625rem] leading-[1.7] text-white/75 md:mt-6 md:max-w-[52ch] md:text-xl">
            {intro}
          </p>
        )}
      </header>

      <div ref={outer} className="pg-outer">
        <div ref={view} className="pg-view">
          {cards.length > 1 && (
            <div aria-hidden className="pg-meter container-site flex items-center gap-4">
              <span dir="ltr" className="shrink-0 font-display text-sm font-bold tracking-[0.12em] text-white/45">
                <span ref={counter} className="text-white">01</span> / {pad(cards.length)}
              </span>
              <span className="relative h-px flex-1 bg-white/15">
                <span ref={bar} className="absolute inset-0 origin-right scale-x-0 bg-brand" />
              </span>
            </div>
          )}

          {/* The row reads left to right like the reference: the next project enters from the right. */}
          <ol ref={track} dir="ltr" className="pg-track m-0 list-none p-0">
            {cards.map((c, i) => (
              <li key={c.id} className="pg-card" style={{ '--i': i } as React.CSSProperties}>
                <div className="pg-tilt">
                  <a
                    href={c.href}
                    dir="rtl"
                    className="group pg-image relative block overflow-hidden rounded-[1.25rem] bg-white/5 text-white no-underline outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand md:rounded-[1.5rem]"
                  >
                    <Media
                      resource={c.tall}
                      fill
                      sizes="(min-width: 1024px) 26vw, (min-width: 768px) 40vw, 72vw"
                      imgClassName="object-top transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                    />
                    {/* A dark fade under the words keeps them legible on any screenshot. */}
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-[linear-gradient(to_top,rgb(13_16_32/0.97)_0%,rgb(13_16_32/0.88)_30%,rgb(13_16_32/0.35)_52%,rgb(13_16_32/0)_68%)]"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 md:p-6">
                      <div className="min-w-0">
                        {c.label && <p className="m-0 mb-2 text-[0.8125rem] font-semibold text-white/65 md:text-sm">{c.label}</p>}
                        <h2 className="m-0 font-display text-[1.75rem] leading-[1.02] font-black tracking-[-0.03em] !text-white md:text-[2rem] xl:text-[2.3rem]">
                          {c.title}
                        </h2>
                        <p className="mt-2 mb-0 max-w-[36ch] text-[0.95rem] leading-[1.5] font-semibold text-white/85 md:text-base">
                          {c.text}
                        </p>
                      </div>
                      <span
                        aria-hidden
                        className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-lg text-ink transition duration-300 group-hover:-translate-x-1 group-hover:bg-brand group-hover:text-white group-active:bg-brand group-active:text-white motion-reduce:transition-none md:size-12"
                      >
                        ←
                      </span>
                    </div>
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
