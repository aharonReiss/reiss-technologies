'use client'

import React, { useId, useRef } from 'react'

import { clamp, useProgress } from './useProgress'

type Props = { eyebrow?: string | null; years: number; label: string; text?: string | null }

const ROWS = 26
/** Lines of "code": an indent (in steps) and a length, so the fill reads as written work, not a bar chart. */
const lines = Array.from({ length: ROWS }, (_, i) => ({
  indent: [0, 1, 2, 2, 3, 2, 1, 2, 3, 3, 2, 1, 0, 1, 2, 3, 4, 3, 2, 1, 2, 2, 1, 0, 1, 0][i]!,
  length: 0.35 + (((i * 37) % 11) / 11) * 0.6,
  accent: i % 7 === 3,
}))

const desktop = () => window.innerWidth >= 768

/**
 * The years of development experience as a numeral that fills with lines of
 * code as the visitor scrolls: experience accumulating, without inventing what
 * each year was. Hebrew reads from the right, so the numeral stands at the right
 * of the composition and every line is written from right to left, the way an
 * RTL line of text grows. Number and statement form one block: the statement
 * starts with the number and sits right beside it.
 * Desktop: a short hold (sticky) while the numeral fills. Phones: numeral and
 * statement side by side, no pinning; the numeral fills as it crosses the screen.
 */
export function Experience({ eyebrow, years, label, text }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const clip = useId().replace(/:/g, '')
  const digits = String(years)
  const w = 330 * digits.length + 40

  useProgress(
    ref,
    (p) => {
      const el = ref.current!
      el.querySelectorAll<SVGRectElement>('.xp-line').forEach((line, i) => {
        const k = ROWS - 1 - i // bottom-up
        line.style.transform = `scaleX(${clamp(p * 1.25 * ROWS - k * 0.9, 0, 1).toFixed(3)})`
      })
      el.style.setProperty('--xp', p.toFixed(3))
    },
    (r, vh) => (desktop() ? -r.top / Math.max(1, r.height - vh) : (vh * 0.9 - r.top) / (vh * 0.75)),
  )

  return (
    <section ref={ref} className="relative bg-muted text-ink md:h-[175vh]">
      <div className="container-site grid grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] items-center gap-x-5 gap-y-6 py-14 md:sticky md:top-0 md:h-svh md:grid-cols-12 md:gap-x-10 md:py-0">
        {/* The numeral: first in the row, so at the right in RTL. */}
        <div className="xp-num md:col-span-5">
          <svg viewBox={`0 0 ${w} 520`} className="ms-auto block h-auto w-full md:h-[min(80svh,46rem)] md:w-auto" aria-hidden>
            <defs>
              <clipPath id={clip}>
                <text x={w / 2} y={478} textAnchor="middle" className="font-display" fontSize={600} fontWeight={900} letterSpacing={-30}>
                  {digits}
                </text>
              </clipPath>
            </defs>
            <g clipPath={`url(#${clip})`}>
              <rect width={w} height={520} className="fill-ink/[0.05]" />
              {lines.map((l, i) => {
                const y = 26 + i * 18.6
                const end = w - 30 - l.indent * 34 // lines start at the right
                const width = (w - 60 - l.indent * 34) * l.length + 60
                return (
                  <rect
                    key={i}
                    className={`xp-line ${l.accent ? 'fill-brand' : i % 2 ? 'fill-ink' : 'fill-ink/80'}`}
                    x={end - width}
                    y={y}
                    width={width}
                    height={11}
                    rx={5.5}
                    style={{ transformOrigin: `${end}px ${y}px` }}
                  />
                )
              })}
            </g>
            <text x={w / 2} y={478} textAnchor="middle" className="font-display fill-none stroke-ink/25" strokeWidth={2} fontSize={600} fontWeight={900} letterSpacing={-30}>
              {digits}
            </text>
          </svg>
        </div>

        <div className="md:col-span-6 md:col-start-6">
          {eyebrow && <p className="m-0 font-display text-xs font-bold tracking-[0.04em] text-brand md:text-sm">{eyebrow}</p>}
          <h2 className="mt-2 mb-0 font-display text-[clamp(1.45rem,6.6vw,2rem)] leading-[1.12] font-black tracking-[-0.03em] !text-ink md:mt-4 md:text-[clamp(2.2rem,3.5vw,3.6rem)] md:leading-[1.05]">
            <span className="text-brand">{years}</span> {label}
          </h2>
          {text && (
            <p className="mt-6 mb-0 max-w-[44ch] border-s-2 border-brand ps-5 text-[1.0625rem] leading-[1.75] text-body max-md:hidden md:text-lg">
              {text}
            </p>
          )}
        </div>
        {/* Phones: the supporting line spans both columns, right under the pair. */}
        {text && <p className="col-span-2 m-0 border-s-2 border-brand ps-4 text-base leading-[1.7] text-body md:hidden">{text}</p>}
      </div>
    </section>
  )
}
