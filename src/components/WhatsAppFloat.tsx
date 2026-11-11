'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { cn } from '@/utilities/cn'

/**
 * Floating WhatsApp button that steps aside while a primary conversion area is
 * on screen ([data-wa-avoid]: the hero actions, forms), so it never covers a
 * button or a field. It returns as soon as that area scrolls away.
 */
export function WhatsAppFloat({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  // Start hidden: the observer decides on the first frame, so it never flashes over the hero CTA.
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const targets = document.querySelectorAll('[data-wa-avoid]')
    if (!targets.length) {
      setHidden(false)
      return
    }
    const visible = new Set<Element>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target)
          else visible.delete(e.target)
        }
        setHidden(visible.size > 0)
      },
      // Only the strip the button occupies matters (bottom ~120px of the screen).
      { rootMargin: '-80% 0px 0px 0px' },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [pathname])

  return (
    <a
      href={href}
      data-track-location="floating_button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="שיחה ב־WhatsApp"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={cn(
        'fixed start-5 bottom-5 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/20 transition duration-300 hover:scale-105 motion-reduce:transition-none',
        hidden && 'pointer-events-none translate-y-6 scale-90 opacity-0',
      )}
    >
      {children}
    </a>
  )
}
