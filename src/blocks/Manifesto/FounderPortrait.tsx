'use client'

import React, { useEffect, useRef } from 'react'

import { Media } from '@/components/Media'
import type { Media as MediaDoc } from '@/payload-types'
import { cn } from '@/utilities/cn'

type Props = {
  portrait: MediaDoc | number
  /** The same cutout, smiling. Optional: without it the portrait only fades in. */
  smile?: MediaDoc | number | null
  className?: string
}

const clamp = (v: number) => Math.min(1, Math.max(0, v))
/** Where the sequence completes: the portrait's centre at this share of the screen height, above the middle's reach. */
const DONE_AT = 0.6
/** Progress split: the neutral face fades in first, then turns to the smile. */
const REVEAL_END = 0.45
const SMILE_END = 0.75

/**
 * A transparent cutout that emerges and smiles, driven by scroll in both
 * directions: progress runs from the portrait's top entering the fold until its
 * centre reaches DONE_AT of the screen, so the smile is complete before it gets to
 * the middle. 0–45% the neutral face fades in (0.2 → 1), 45–75% the smile fades in
 * over it, then holds. The neutral layer stays opaque under the smile and only
 * drops out once the smile is nearly solid, so the crossfade never turns
 * see-through or shows a doubled outline. Opacity only; styles are written
 * directly, no re-renders. Reduced motion: the smile, at once.
 */
export function FounderPortrait({ portrait, smile, className }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const base = useRef<HTMLDivElement>(null)
  const top = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current!
    const set = (reveal: number, s: number) => {
      el.style.opacity = (0.2 + 0.8 * reveal).toFixed(3)
      if (top.current) top.current.style.opacity = s.toFixed(3)
      if (base.current) base.current.style.opacity = smile ? (1 - clamp((s - 0.6) / 0.4)).toFixed(3) : '1'
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return set(1, 1)

    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      const r = el.getBoundingClientRect()
      const end = vh * DONE_AT - r.height / 2
      const p = clamp((vh - r.top) / Math.max(1, vh - end))
      set(clamp(p / REVEAL_END), clamp((p - REVEAL_END) / (SMILE_END - REVEAL_END)))
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
  }, [smile])

  return (
    <div ref={root} className={cn('relative', className)}>
      <div ref={base}>
        <Media resource={portrait} sizes="(min-width: 768px) 240px, 128px" imgClassName="block h-auto w-full" />
      </div>
      {smile && (
        <div ref={top} aria-hidden className="absolute inset-0 opacity-0">
          <Media resource={smile} sizes="(min-width: 768px) 240px, 128px" imgClassName="block h-auto w-full" />
        </div>
      )}
    </div>
  )
}
