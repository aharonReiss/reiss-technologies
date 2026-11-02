'use client'

import React, { useEffect, useRef } from 'react'

const INK = [13, 16, 32]
const BLUE = [67, 85, 245]
// Light neutral grey: Deep Navy at 22% on Cool White.
const GREY = [196, 198, 206]
const WINDOW = 5 // words in transition at once: the width of the travelling blue band

/** Colouring runs while the paragraph top goes from 90% of the screen to its bottom at 72%. */
export const REVEAL_START = 0.9
export const REVEAL_END = 0.72

const lerp = (a: number[], b: number[], t: number) =>
  `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * t)).join(',')})`
/** Grey → Electric Blue → Deep Navy; words marked *like this* settle on blue. */
const shade = (t: number, keep: boolean) =>
  t < 0.5 ? lerp(GREY, BLUE, t * 2) : keep ? `rgb(${BLUE.join(',')})` : lerp(BLUE, INK, (t - 0.5) * 2)

/**
 * A paragraph that is fully visible in grey and comes alive word by word as it
 * scrolls through the lower part of the screen, in reading order (RTL, so right
 * to left): each word passes through Electric Blue and settles on Deep Navy, so
 * a narrow blue band travels through the text. Words wrapped in *asterisks* keep
 * the blue as a closing accent. Tied to scroll position in both directions; nothing moves.
 * It finishes while the paragraph is still low on screen, leaving room for the
 * lights-off transition that follows. Without JS or with reduced motion the
 * text shows its final colours. Keep the numbers in sync with boot.ts, which runs the
 * same colouring before hydration.
 */
export function ColorReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current!
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // On a full page load boot.ts has already attached before hydration; this covers
    // client-side navigation.
    if (el.dataset.colorReveal === 'on') return
    const words = [...el.querySelectorAll<HTMLElement>('[data-w]')]
    let frame = 0
    let last = -1

    const update = () => {
      frame = 0
      const vh = window.innerHeight
      const r = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (vh * REVEAL_START - r.top) / (vh * (REVEAL_START - REVEAL_END) + r.height)))
      if (p === last) return
      last = p
      const head = p * (words.length + WINDOW)
      words.forEach((w, i) => {
        const t = Math.min(1, Math.max(0, (head - i) / WINDOW))
        w.style.color = shade(t, w.hasAttribute('data-keep'))
      })
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    el.dataset.colorReveal = 'on'
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [text])

  // Split into words, remembering which fall inside *…*.
  let keep = false
  const parts = text.split(/(\s+)/).map((part) => {
    if (/^\s+$/.test(part)) return { part, space: true, keep: false }
    const opens = part.startsWith('*')
    const closes = part.endsWith('*')
    if (opens) keep = true
    const word = { part: part.replace(/\*/g, ''), space: false, keep }
    if (closes) keep = false
    return word
  })
  return (
    // The boot script may have coloured the words and marked the paragraph before hydration.
    <p ref={ref} data-color-text className={className} suppressHydrationWarning>
      {parts.map(({ part, space, keep }, i) =>
        space ? (
          part
        ) : (
          <span key={i} data-w data-keep={keep || undefined} className={keep ? 'text-brand' : undefined} suppressHydrationWarning>
            {part}
          </span>
        ),
      )}
    </p>
  )
}
