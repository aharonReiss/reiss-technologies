'use client'

import React, { useEffect, useRef, useState } from 'react'

import { cn } from '@/utilities/cn'

type Props = {
  /** The full-page capture (next/image or a plain img), at its own proportions. */
  children: React.ReactNode
  /** Names the site for screen readers. */
  label: string
  /** Where "להמשך הפרויקט" leads: past the phone, so exploring it stays optional. */
  nextHref?: string
  className?: string
}

/**
 * One phone with the whole mobile site inside it, explored by scrolling the
 * screen itself: native scrolling for wheel, trackpad, touch and keyboard. The
 * frame stays put; at either end the scroll carries on to the page, so nothing is
 * trapped. It is a picture of the site, so nothing inside pretends to be clickable.
 */
export function PhonePreview({ children, label, nextHref, className }: Props) {
  const screen = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  const [moved, setMoved] = useState(false)

  useEffect(() => {
    const el = screen.current
    if (!el) return
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight
      const p = max > 0 ? el.scrollTop / max : 0
      if (bar.current) bar.current.style.transform = `translateY(${(p * 100 * 4).toFixed(1)}%)`
      if (el.scrollTop > 24) setMoved(true)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <figure className={cn('m-0 flex flex-col items-center', className)}>
      <div className="relative rounded-[2.6rem] border-[7px] border-[#23283f] bg-black ring-1 ring-white/10 shadow-[0_50px_100px_-40px_rgb(0_0_0/0.8)]">
        <div
          ref={screen}
          tabIndex={0}
          role="region"
          aria-label={`${label}: גללו כדי לעבור על האתר במובייל`}
          className="phone-screen h-[min(66svh,680px)] w-[min(74vw,360px)] overflow-y-auto rounded-[2.1rem] bg-white outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-ink md:aspect-[390/844] md:h-[min(76svh,780px)] md:w-auto"
        >
          {children}
        </div>
        {/* Where in the site the screen is: a short thumb on a hairline track. */}
        <span aria-hidden className="absolute top-1/2 -right-5 h-24 w-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/12 md:-right-6">
          <span ref={bar} className="block h-1/5 w-full rounded-full bg-brand transition-transform duration-150 ease-out" />
        </span>
      </div>
      <figcaption
        aria-hidden
        className={cn(
          'mt-5 flex items-center gap-2 text-sm font-semibold text-white/60 transition-opacity duration-500',
          moved && 'opacity-0',
        )}
      >
        <svg viewBox="0 0 16 24" className="phone-hint h-5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="1" y="1" width="14" height="22" rx="7" />
          <line x1="8" y1="6" x2="8" y2="10" strokeLinecap="round" />
        </svg>
        גללו בתוך המסך
      </figcaption>
      {nextHref && (
        <a
          href={nextHref}
          className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          להמשך הפרויקט
          <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M8 2v11M3.5 8.5 8 13l4.5-4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      )}
    </figure>
  )
}
