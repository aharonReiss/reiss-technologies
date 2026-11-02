'use client'

import { useEffect } from 'react'

const clamp = (v: number) => Math.min(1, Math.max(0, v))

/**
 * Scroll-linked motion for the case study, driven by data attributes so the page
 * itself stays a server component:
 * - [data-pan]: a screen whose first child (a tall capture) scrolls up inside it.
 *   Inside a [data-pin] wrapper it follows the pinned range (desktop); otherwise it
 *   follows the screen's own pass through the viewport.
 * - [data-grow]: grows from 0.9 to full size as its [data-pin] section arrives (desktop).
 * Nothing moves under prefers-reduced-motion; the CSS shows a static composition.
 */
export function CaseStudyMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const pans = [...document.querySelectorAll<HTMLElement>('[data-pan]')]
    const grows = [...document.querySelectorAll<HTMLElement>('[data-grow]')]
    let raf = 0

    const update = () => {
      raf = 0
      const vh = window.innerHeight
      const desktop = window.innerWidth >= 768

      pans.forEach((view) => {
        const inner = view.firstElementChild as HTMLElement | null
        if (!inner) return
        const pin = desktop ? view.closest<HTMLElement>('[data-pin]') : null
        let p: number
        if (pin) {
          const r = pin.getBoundingClientRect()
          p = clamp(-r.top / Math.max(1, r.height - vh))
        } else {
          // From the screen's top at 85% of the viewport until its bottom reaches the middle.
          const r = view.getBoundingClientRect()
          p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35))
        }
        const travel = Math.max(0, inner.offsetHeight - view.clientHeight)
        inner.style.transform = `translate3d(0,${(-p * travel).toFixed(1)}px,0)`
      })

      grows.forEach((el) => {
        const pin = el.closest<HTMLElement>('[data-pin]')
        if (!desktop || !pin) return void (el.style.transform = '')
        const q = clamp((vh - pin.getBoundingClientRect().top) / (vh * 0.85))
        el.style.transform = `scale(${(0.9 + 0.1 * q).toFixed(4)})`
      })
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    // Captures load after the first measure; re-measure their heights when they do.
    document.querySelectorAll('[data-pan] img').forEach((img) => img.addEventListener('load', schedule))
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return null
}
