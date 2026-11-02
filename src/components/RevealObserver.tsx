'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Marks [data-reveal] elements with [data-revealed] as they scroll into view.
 * One observer for the whole page; re-scans after client-side navigation and
 * when new content mounts.
 */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    // Observed element → the reveal targets it stands for.
    const targets = new Map<Element, Set<Element>>()

    const reveal: IntersectionObserverCallback = (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        targets.get(entry.target)?.forEach((el) => el.setAttribute('data-revealed', ''))
        targets.delete(entry.target)
        observer.unobserve(entry.target)
      }
    }
    // Trigger once the element has risen ~a fifth into the screen – where the eye actually is.
    const io = new IntersectionObserver(reveal, { rootMargin: '0px 0px -22% 0px', threshold: 0 })
    // Masked display lines start the moment their line box enters the screen (the same
    // trigger as the pre-hydration watcher in boot.ts), so the rise is always seen.
    const early = new IntersectionObserver(reveal, { rootMargin: '0px', threshold: 0 })

    // A fast fling can carry an element past the screen between two frames, so it never
    // "intersects". Anything already scrolled past is revealed so it is never left hidden.
    let frame = 0
    const catchUp = () => {
      frame = 0
      for (const [watched, els] of targets) {
        if (watched.getBoundingClientRect().bottom > 0) continue
        els.forEach((el) => el.setAttribute('data-revealed', ''))
        targets.delete(watched)
        io.unobserve(watched)
        early.unobserve(watched)
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(catchUp)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // [data-boot] lines are already handled by the pre-hydration script (boot.ts).
    const scan = () =>
      document.querySelectorAll('[data-reveal]:not([data-revealed]):not([data-boot])').forEach((el) => {
        // A fully clip-path'd "wipe" (or a "mask" line pushed out of its
        // overflow-hidden parent) has zero visible area, so Chromium never
        // reports it as intersecting – watch its (unclipped) parent instead.
        const mode = el.getAttribute('data-reveal')
        const watched = mode === 'wipe' || mode === 'mask' ? (el.parentElement ?? el) : el
        if (!targets.has(watched)) targets.set(watched, new Set())
        targets.get(watched)!.add(el)
        ;(mode === 'mask' ? early : io).observe(watched)
      })
    scan()

    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      early.disconnect()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
      mo.disconnect()
    }
  }, [pathname])

  return null
}
