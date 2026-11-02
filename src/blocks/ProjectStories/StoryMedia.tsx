'use client'

import React, { useEffect, useRef, useState } from 'react'

import type { Media } from '@/payload-types'

type Props = { media: Media; poster?: Media | null; size: 'card' | 'large'; label?: string | null }

/** Same-origin paths, so the files load whichever address the site is opened at. */
const relative = (url?: string | null) => (url ?? '').replace(/^https?:\/\/[^/]+/, '')
const src = (m: Media, size: 'card' | 'large') => relative(m.sizes?.[size]?.url || m.url)

/**
 * A real screen from the project: a still image, or a short silent loop that plays
 * only while it is on screen (and never with reduced motion), with its own
 * pause button. The poster holds the frame's size, so nothing shifts on load.
 */
export function StoryMedia({ media, poster, size, label }: Props) {
  const video = media.mimeType?.startsWith('video/')
  const ref = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(false)
  const userPaused = useRef(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !mq.matches && !userPaused.current) {
          v.play().then(() => setPaused(false), () => setPaused(true))
        } else {
          v.pause()
          setPaused(true)
        }
      },
      { threshold: 0.4 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  if (!video) {
    return <img src={src(media, size)} alt={media.alt} loading="lazy" decoding="async" className="size-full object-cover object-top" />
  }

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) {
      userPaused.current = false
      v.play().then(() => setPaused(false), () => {})
    } else {
      userPaused.current = true
      v.pause()
      setPaused(true)
    }
  }

  return (
    <div className="relative size-full">
      <video
        ref={ref}
        src={relative(media.url) || undefined}
        poster={poster ? src(poster, size) : undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-label={media.alt}
        className="size-full object-cover object-top"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={`${paused ? 'הפעלת' : 'השהיית'} ההדגמה${label ? ` של ${label}` : ''}`}
        className="absolute bottom-2 left-2 grid size-9 cursor-pointer place-items-center rounded-full bg-ink/70 text-white backdrop-blur transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        {paused ? (
          <svg aria-hidden viewBox="0 0 16 16" className="size-3.5 fill-current">
            <path d="M4 2.5v11l9-5.5z" />
          </svg>
        ) : (
          <svg aria-hidden viewBox="0 0 16 16" className="size-3.5 fill-current">
            <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" />
          </svg>
        )}
      </button>
    </div>
  )
}
