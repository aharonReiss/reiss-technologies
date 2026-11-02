'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Motion infrastructure for scroll-driven effects. For every [data-progress]
 * element on screen it writes `--p`: 0 when the element's top reaches the
 * bottom of the viewport ("enter") or the top of the page, 1 once its bottom
 * has passed the top of the viewport. CSS reads `--p`, so effects stay
 * declarative, follow the scrollbar exactly and never hijack scrolling.
 *
 * `data-progress="exit"` measures only the leave phase (0 at rest, 1 when the
 * element has scrolled away) – used by heroes that start on screen.
 */
export function ScrollProgress() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const visible = new Set<HTMLElement>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement
          if (e.isIntersecting) visible.add(el)
          else visible.delete(el)
        }
        schedule()
      },
      { rootMargin: '10% 0px 10% 0px' },
    )
    document.querySelectorAll<HTMLElement>('[data-progress]').forEach((el) => io.observe(el))

    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      for (const el of visible) {
        const r = el.getBoundingClientRect()
        const p =
          el.dataset.progress === 'exit'
            ? -r.top / Math.max(1, r.height)
            : (vh - r.top) / Math.max(1, vh + r.height)
        el.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(4))
      }
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [pathname])

  return null
}
