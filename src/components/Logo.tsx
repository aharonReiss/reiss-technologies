import React from 'react'

import type { Media as MediaDoc } from '@/payload-types'
import { cn } from '@/utilities/cn'

type Props = {
  /**
   * Logo uploaded in site settings for THIS background (the caller picks
   * "לוגו" for light backgrounds or "לוגו לרקע כהה" for dark ones).
   * Empty → the default REISS DIGITAL SVG.
   */
  logo?: MediaDoc | null
  siteName: string
  /** Dark background: chooses the white default wordmark. */
  inverted?: boolean
  className?: string
}

/** Payload stores absolute URLs; serve the file from this origin. */
const relative = (url: string) => url.replace(/^https?:\/\/[^/]+/, '')

/**
 * Site logo. An uploaded logo (SVG or transparent PNG) overrides the built-in
 * one and is shown as-is: plain <img>, so SVGs stay vector and transparent.
 * Defaults: compact one-line wordmark on phones, full lockup from md up.
 */
export function Logo({ logo, siteName, inverted, className }: Props) {
  if (logo?.url) {
    return (
      <span className={cn('flex items-center', className)}>
        {/* eslint-disable-next-line @next/next/no-img-element -- uploaded logo may be SVG; keep it vector */}
        <img
          src={relative(logo.url)}
          alt={logo.alt || siteName}
          width={logo.width ?? undefined}
          height={logo.height ?? undefined}
          className="h-8 w-auto max-w-[180px] object-contain md:h-10 md:max-w-[220px]"
        />
      </span>
    )
  }

  const tone = inverted ? 'dark-bg' : 'light-bg'
  return (
    <span className={cn('flex items-center', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- crisp vector logo */}
      <img
        src={`/brand/logo-compact-${tone}.svg`}
        alt={siteName}
        width={1000}
        height={234}
        className="h-7 w-auto md:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/brand/logo-${tone}.svg`}
        alt={siteName}
        width={1000}
        height={374}
        className="hidden h-10 w-auto md:block"
      />
    </span>
  )
}
