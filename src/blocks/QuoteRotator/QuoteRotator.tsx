'use client'

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

export type Quote = {
  id: number
  quote: string
  name: string
  business: string | null
  href: string | null
  placeholder: boolean
}

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * One large testimonial at a time. Every quote sits in the same grid cell, so the
 * section keeps the height of the longest one and never shifts when they change.
 * The active progress bar runs for 7s and its animationend advances to the next
 * quote; hovering or focusing pauses that animation, and choosing one stops it.
 */
export function QuoteRotator({ label, items, anchor }: { label?: string | null; items: Quote[]; anchor?: string | null }) {
  const [i, setI] = useState(0)
  const [hold, setHold] = useState(false)
  const [stopped, setStopped] = useState(false)
  const [changes, setChanges] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const n = items.length

  // The marks scale in once, the first time the section is seen.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        el.dataset.in = ''
        io.disconnect()
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const go = (k: number) => {
    setI(((k % n) + n) % n)
    setChanges((c) => c + 1)
  }
  const choose = (k: number) => {
    setStopped(true)
    if (k !== i) go(k)
  }

  return (
    <section
      ref={ref}
      id={anchor || undefined}
      aria-roledescription="carousel"
      aria-label={label?.replace(/\.$/, '') || 'המלצות'}
      className="qr bg-muted text-ink"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      <div className="container-site py-16 md:py-[13vh]">
        {label && <p className="m-0 font-display text-sm font-bold text-brand md:text-base">{label}</p>}

        <div className="relative mt-6 md:mt-8 md:max-w-[min(62rem,84%)]">
          {/* Graphic marks: the opening one above the start of the quote, the closing one below its far edge. */}
          <span key={`o${changes}`} aria-hidden className="qr-mark qr-open" data-pulse={changes > 0 ? '' : undefined}>
            ”
          </span>

          <div className="grid py-[3.4rem] md:py-[6rem]">
            {items.map((q, k) => (
              <figure
                key={q.id}
                aria-hidden={k !== i}
                data-active={k === i ? '' : undefined}
                role="group"
                aria-roledescription="slide"
                aria-label={`${k + 1} מתוך ${n}`}
                className="qr-item m-0 [grid-area:1/1]"
              >
                <blockquote className="m-0">
                  <p className="m-0 font-display text-[clamp(1.5rem,6.4vw,2rem)] leading-[1.22] font-black tracking-[-0.025em] text-ink md:text-[clamp(2rem,3.2vw,3.3rem)] md:leading-[1.14]">
                    {q.quote}
                  </p>
                </blockquote>
                <figcaption className="mt-6 text-base leading-snug md:mt-8 md:text-lg">
                  <span className="font-display font-bold text-ink">{q.name}</span>
                  {q.business && (
                    <span className="text-body">
                      {', '}
                      {q.href ? (
                        <Link
                          href={q.href}
                          tabIndex={k === i ? undefined : -1}
                          className="text-body underline decoration-ink/30 underline-offset-4 hover:text-brand hover:decoration-brand"
                        >
                          {q.business}
                        </Link>
                      ) : (
                        q.business
                      )}
                    </span>
                  )}
                  {q.placeholder && (
                    <span className="mt-2 block text-xs font-semibold text-brand">
                      המלצה זמנית, תוחלף בהמלצה אמיתית של לקוח
                    </span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>

          <span key={`c${changes}`} aria-hidden className="qr-mark qr-close" data-pulse={changes > 0 ? '' : undefined}>
            “
          </span>
        </div>

        {n > 1 && (
          <div className="mt-3 flex items-center gap-5">
            <span dir="ltr" className="font-display text-sm font-bold tracking-[0.12em] text-ink tabular-nums">
              {pad(i + 1)} <span className="text-ink/35">/ {pad(n)}</span>
            </span>
            <div className="flex gap-1">
              {items.map((q, k) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => choose(k)}
                  aria-label={`המלצה ${k + 1} מתוך ${n}`}
                  aria-current={k === i ? 'true' : undefined}
                  className="group flex h-11 w-12 cursor-pointer items-center outline-none md:w-16"
                >
                  <span className="relative block h-0.5 w-full overflow-hidden bg-ink/15 group-hover:bg-ink/30 group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-brand">
                    {k === i && (
                      <span
                        key={changes}
                        className="qr-bar absolute inset-0 bg-brand"
                        data-run={stopped ? undefined : ''}
                        style={{ animationPlayState: hold ? 'paused' : 'running' }}
                        onAnimationEnd={() => go(i + 1)}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
