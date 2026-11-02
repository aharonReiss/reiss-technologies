'use client'

import { type RefObject, useEffect } from 'react'

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Calls `apply(p)` with the element's scroll progress, 0 → 1, once per frame while
 * it moves. `measure` maps the element's rect and the viewport height to progress;
 * the default runs from its top reaching the bottom of the screen until its
 * bottom reaches the top. Reduced motion: `apply(1)` once, the finished state.
 * Styles are written directly by `apply`, so nothing re-renders.
 */
export function useProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  apply: (p: number) => void,
  measure: (r: DOMRect, vh: number) => number = (r, vh) => (vh - r.top) / (vh + r.height),
) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reducedMotion()) return apply(1)
    let frame = 0
    const update = () => {
      frame = 0
      apply(clamp(measure(el.getBoundingClientRect(), window.innerHeight)))
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
    // apply and measure are module-level or stable per component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])
}
