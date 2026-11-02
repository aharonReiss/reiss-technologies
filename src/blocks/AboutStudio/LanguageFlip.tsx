'use client'

import Link from 'next/link'
import React, { useRef } from 'react'

import { Media } from '@/components/Media'
import type { Media as MediaDoc } from '@/payload-types'
import { clamp, useProgress } from './useProgress'

type Screen = { label: string; desktop: MediaDoc | number; phone: MediaDoc | number }
type Props = {
  eyebrow?: string | null
  heading: React.ReactNode
  text?: string | null
  href?: string | null
  linkLabel?: string | null
  screens: Screen[]
}

const desktop = () => window.innerWidth >= 768
/** Where each change happens in the run (0 → 1): change k wipes over WIPE of it. */
const WIPE = 0.3
const start = (k: number, n: number) => 0.1 + ((k - 1) * (0.86 - WIPE)) / Math.max(1, n - 2)

const layer = (k: number): React.CSSProperties =>
  k ? { clipPath: `inset(0 0 0 calc((1 - var(--t${k}, 1)) * 100%))` } : {}

/** The edge of a change in progress: a thin Electric Blue line at the wipe. */
const edge = (k: number): React.CSSProperties => ({ left: `calc((1 - var(--t${k}, 1)) * 100%)`, opacity: `var(--e${k}, 0)` })

/**
 * One real decision from a real project, shown on the real screens: the site
 * changes language and its whole interface changes direction with it. As the
 * visitor scrolls, each next language wipes in from the right, the way Hebrew
 * reads, on the desktop and the phone together, so the logo, menu and booking
 * bar can be seen switching sides. Desktop: a short hold (sticky) while it runs.
 * Phones: the phone alone, large, no pinning; it runs as the phone crosses the
 * screen. Reduced motion: the last screen, still.
 */
export function LanguageFlip({ eyebrow, heading, text, href, linkLabel, screens }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const n = screens.length

  useProgress(
    ref,
    (p) => {
      const el = ref.current!
      let active = 0
      for (let k = 1; k < n; k++) {
        const t = clamp((p - start(k, n)) / WIPE)
        el.style.setProperty(`--t${k}`, t.toFixed(4))
        el.style.setProperty(`--e${k}`, t > 0 && t < 1 ? '1' : '0')
        if (t >= 0.5) active = k
      }
      el.querySelectorAll<HTMLElement>('[data-lang]').forEach((node, i) => node.toggleAttribute('data-on', i === active))
    },
    (r, vh) => (desktop() ? -r.top / Math.max(1, r.height - vh) : (vh * 0.85 - r.top) / (r.height * 0.95)),
  )

  const labels = (
    <ol className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 font-display text-base font-bold md:text-lg" aria-label="השפות באתר">
      {screens.map((s, i) => {
        // The arrow shows which way the language reads, so the flip is seen, not explained.
        const rtl = /[֐-׿]/.test(s.label)
        const arrow = <span aria-hidden className="text-[0.85em] font-normal">{rtl ? '←' : '→'}</span>
        return (
          <li key={i} data-lang data-on={i === n - 1 ? '' : undefined} className="lf-lang flex items-center gap-2 text-white/35">
            <span aria-hidden className="lf-dot size-2 rounded-full bg-current" />
            {!rtl && arrow}
            <bdi dir={rtl ? 'rtl' : 'ltr'}>{s.label}</bdi>
            {rtl && arrow}
          </li>
        )
      })}
    </ol>
  )

  return (
    <section ref={ref} className="lf section-dark relative bg-ink text-white/70 md:h-[240vh]">
      <div className="container-site grid gap-y-9 py-16 md:sticky md:top-0 md:h-svh md:grid-cols-12 md:items-center md:gap-x-10 md:py-0">
        <div className="md:col-span-4">
          {eyebrow && <p className="m-0 font-display text-sm font-bold tracking-[0.04em] text-brand">{eyebrow}</p>}
          <h2 className="mt-3 mb-0 font-display text-[clamp(2.1rem,9.6vw,2.9rem)] leading-[1.02] font-black tracking-[-0.04em] md:text-[clamp(2.3rem,3.4vw,3.6rem)]">
            {heading}
          </h2>
          {text && <p className="mt-5 mb-0 max-w-[40ch] text-[1.0625rem] leading-[1.75] text-white/72 md:text-lg">{text}</p>}
          <div className="mt-7">{labels}</div>
          {href && (
            <Link
              href={href}
              className="mt-8 inline-flex min-h-11 items-center gap-2 font-display text-base font-bold text-white underline decoration-white/30 underline-offset-[6px] transition-colors hover:text-brand hover:decoration-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand max-md:hidden"
            >
              {linkLabel || 'לסיפור הפרויקט המלא'}
              <span aria-hidden>←</span>
            </Link>
          )}
        </div>

        <div className="relative md:col-span-8 md:col-start-5">
          {/* Desktop: the browser, with the phone over its lower left corner */}
          <div className="relative hidden pb-[8%] ps-0 pe-[10%] md:block">
            <div className="overflow-hidden rounded-xl bg-ink-soft ring-1 ring-white/15 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]">
              <div className="flex h-7 items-center gap-1.5 border-b border-white/10 px-3" dir="ltr">
                <span className="size-2 rounded-full bg-white/20" />
                <span className="size-2 rounded-full bg-white/20" />
                <span className="size-2 rounded-full bg-white/20" />
                <span className="ms-3 h-3.5 w-48 rounded-full bg-white/10" />
              </div>
              <div className="relative aspect-[16/10]">
                {screens.map((s, k) => (
                  <div key={k} className="absolute inset-0" style={layer(k)}>
                    <Media resource={s.desktop} fill sizes="(min-width: 768px) 60vw, 1px" imgClassName="object-cover object-top" />
                  </div>
                ))}
                {screens.slice(1).map((_, i) => (
                  <span key={i} aria-hidden className="absolute inset-y-0 w-[3px] -translate-x-1/2 bg-brand shadow-[0_0_24px_4px_rgb(67_85_245/0.7)]" style={edge(i + 1)} />
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-[24%]">
              <PhoneScreens screens={screens} sizes="(min-width: 768px) 16vw, 1px" />
            </div>
          </div>

          {/* Phones: one large phone */}
          <div className="mx-auto w-[min(70vw,300px)] md:hidden">
            <PhoneScreens screens={screens} sizes="70vw" />
          </div>
          {href && (
            <Link
              href={href}
              className="mt-8 inline-flex min-h-11 items-center gap-2 font-display text-base font-bold text-white underline decoration-white/30 underline-offset-[6px] md:hidden"
            >
              {linkLabel || 'לסיפור הפרויקט המלא'}
              <span aria-hidden>←</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

function PhoneScreens({ screens, sizes }: { screens: Screen[]; sizes: string }) {
  return (
    <div className="overflow-hidden rounded-[1.7rem] border-[5px] border-[#1d2238] bg-ink shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)]">
      <div className="relative aspect-[390/844] overflow-hidden rounded-[1.3rem]">
        {screens.map((s, k) => (
          <div key={k} className="absolute inset-0" style={layer(k)}>
            <Media resource={s.phone} fill sizes={sizes} imgClassName="object-cover object-top" />
          </div>
        ))}
        {screens.slice(1).map((_, i) => (
          <span key={i} aria-hidden className="absolute inset-y-0 w-[3px] -translate-x-1/2 bg-brand shadow-[0_0_18px_3px_rgb(67_85_245/0.7)]" style={edge(i + 1)} />
        ))}
      </div>
    </div>
  )
}
