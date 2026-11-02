'use client'

import React, { useEffect, useRef } from 'react'

const clamp = (v: number) => Math.min(1, Math.max(0, v))

/**
 * Recedes each stacked card as later cards land on it: a little smaller (from its
 * top edge, so its visible strip stays put) and a touch darker per layer, tied to
 * how far each later card has risen. The stacking itself is CSS sticky. Nothing
 * runs under prefers-reduced-motion.
 */
export function StackMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = [...el.querySelectorAll<HTMLElement>('[data-stack-card]')]
    let raf = 0

    const update = () => {
      raf = 0
      const vh = window.innerHeight
      // 0 while a card is below the fold, 1 once it has landed on its sticky top.
      const landed = cards.map((card) => {
        const pin = parseFloat(getComputedStyle(card).top) || 0
        return clamp((vh - card.getBoundingClientRect().top) / Math.max(1, vh - pin))
      })
      cards.forEach((card, i) => {
        const face = card.querySelector<HTMLElement>('[data-stack-face]')
        const shade = card.querySelector<HTMLElement>('[data-stack-shade]')
        if (!face || !shade) return
        const depth = landed.slice(i + 1).reduce((a, b) => a + b, 0)
        face.style.transform = depth ? `scale(${(1 - 0.03 * depth).toFixed(4)})` : ''
        shade.style.opacity = (0.07 * depth).toFixed(3)
      })
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    // Phones: every card takes the natural height of the tallest one (the layers must
    // line up), capped by the room the stack has – so no card carries a dead area. The
    // CSS height is the fallback; desktop keeps it.
    const faces = cards.map((c) => c.querySelector<HTMLElement>('[data-stack-face]')!).filter(Boolean)
    const fit = () => {
      faces.forEach((f) => (f.style.height = ''))
      if (window.innerWidth >= 768) return
      const room = faces[0].offsetHeight
      faces.forEach((f) => (f.style.height = 'auto'))
      const tallest = Math.max(...faces.map((f) => f.offsetHeight))
      faces.forEach((f) => (f.style.height = `${Math.min(tallest, room)}px`))
      schedule()
    }
    fit()
    document.fonts?.ready.then(fit)
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', fit)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', fit)
    }
  }, [])

  return (
    <div ref={root} className="relative">
      {children}
    </div>
  )
}
