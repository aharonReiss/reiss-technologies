'use client'

import { useEffect } from 'react'

/**
 * Opening a service row closes the one that was open (one <details name> group).
 * When that row sits above, its panel shrinks and everything below it, including
 * the row just clicked, slides up and out of view. This holds the clicked
 * heading where it was on screen for the length of the 300ms transition.
 */
export function KeepRowInView() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const summary = (e.target as Element).closest?.('details.svc-row > summary')
      if (!summary) return
      const start = summary.getBoundingClientRect().top
      const until = performance.now() + 420
      const hold = () => {
        const drift = summary.getBoundingClientRect().top - start
        if (Math.abs(drift) > 0.5) window.scrollBy({ top: drift, behavior: 'instant' })
        if (performance.now() < until) requestAnimationFrame(hold)
      }
      requestAnimationFrame(hold)
    }
    // A link to /services#<slug> (the footer, the header menu) opens that row.
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      const row = id ? document.getElementById(id) : null
      if (row instanceof HTMLDetailsElement && row.classList.contains('svc-row')) {
        row.open = true
        row.scrollIntoView({ block: 'start' })
      }
    }
    openFromHash()
    document.addEventListener('click', onClick)
    window.addEventListener('hashchange', openFromHash)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('hashchange', openFromHash)
    }
  }, [])
  return null
}
