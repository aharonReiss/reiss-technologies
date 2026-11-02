'use client'

import React, { useEffect, useRef } from 'react'

const MAX = 156 // 9.75rem: the largest the manifesto ever gets

/**
 * Desktop: every manifesto sentence stays on one line at one shared size – the
 * largest at which the longest sentence fits the container. CSS starts from a
 * close estimate (container width ÷ 7.85, the longest approved sentence) so
 * there is no visible jump; this corrects it for any text from the CMS, after
 * fonts load and whenever the width changes. Phones keep their own two-line
 * composition and are left alone.
 */
export function FitLines({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const h = ref.current!
    const desktop = window.matchMedia('(min-width: 768px)')
    let frame = 0

    const fit = () => {
      frame = 0
      if (!desktop.matches) {
        h.style.removeProperty('--fit')
        return
      }
      // Measure each line's natural width at 100px on an untransformed clone.
      let widest = 0
      for (const line of h.querySelectorAll<HTMLElement>('[data-reveal="mask"]')) {
        const probe = line.cloneNode(true) as HTMLElement
        probe.style.cssText =
          'position:absolute;visibility:hidden;white-space:nowrap;width:max-content;font-size:100px;transform:none'
        h.appendChild(probe)
        widest = Math.max(widest, probe.getBoundingClientRect().width)
        probe.remove()
      }
      if (!widest) return
      const size = Math.min(MAX, (h.clientWidth / widest) * 100 * 0.99)
      h.style.setProperty('--fit', `${size.toFixed(2)}px`)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(fit)
    }

    const ro = new ResizeObserver(schedule)
    ro.observe(h)
    document.fonts.ready.then(schedule)
    desktop.addEventListener('change', schedule)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(frame)
      desktop.removeEventListener('change', schedule)
    }
  }, [])

  return (
    <h2 ref={ref} className={className}>
      {children}
    </h2>
  )
}
