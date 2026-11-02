'use client'

import React, { useEffect, useRef, useState } from 'react'

import { Media } from '@/components/Media'
import type { Media as MediaDoc } from '@/payload-types'
import { cn } from '@/utilities/cn'
import type { SignatureStrokes } from '@/utilities/signatureStrokes'

type Props = {
  strokes?: SignatureStrokes | null
  /** Fallback when the strokes could not be computed. */
  image?: MediaDoc | null
  text?: string | null
  className?: string
  startDelayMs?: number
}

/** Becomes true once the element is mostly on screen. */
function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, visible }
}

// Stroke reveal: a zero-width (or zero-height) clip at the stroke's starting edge.
const hiddenClip = { rtl: 'inset(0 0 0 100%)', down: 'inset(0 0 100% 0)' }
const shownClip = 'inset(0 0 0 0)'

export function SignatureClient({ strokes, image, text, className, startDelayMs = 0 }: Props) {
  // The observer watches the unclipped outer span: Chromium measures a fully
  // clip-path'd target as zero-area, so observing a clipped element never fires.
  const { ref, visible } = useInView<HTMLSpanElement>()

  if (strokes) {
    return (
      <span
        ref={ref}
        role="img"
        aria-label={image?.alt || text || 'חתימה'}
        className={cn('relative inline-block', className)}
        style={{ aspectRatio: strokes.aspectRatio }}
      >
        {strokes.strokes.map((s, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute bg-current motion-reduce:!transition-none"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.width}%`,
              height: `${s.height}%`,
              WebkitMaskImage: `url(${s.src})`,
              maskImage: `url(${s.src})`,
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              clipPath: visible ? shownClip : hiddenClip[s.direction],
              transition: `clip-path ${s.durationMs}ms cubic-bezier(0.45, 0.05, 0.55, 0.95) ${s.delayMs + startDelayMs}ms`,
            }}
          />
        ))}
      </span>
    )
  }

  if (!image && !text) return null

  // Fallback: wipe the whole signature in one go (right-to-left for Hebrew text).
  const rtl = !image && /[֐-׿]/.test(text ?? '')
  const hidden = rtl ? '[clip-path:inset(-20%_-5%_-20%_100%)]' : '[clip-path:inset(-20%_100%_-20%_-5%)]'

  return (
    <span ref={ref} dir={rtl ? 'rtl' : 'ltr'} className={cn('inline-block', className)}>
      <span
        className={cn(
          'block h-full transition-[clip-path] duration-[1800ms] ease-in-out motion-reduce:transition-none',
          visible ? '[clip-path:inset(-20%_-5%_-20%_-5%)]' : hidden,
        )}
      >
        {image ? (
          <Media resource={image} imgClassName="h-full w-auto" sizes="320px" />
        ) : (
          <span className="font-signature leading-none whitespace-nowrap">{text}</span>
        )}
      </span>
    </span>
  )
}
