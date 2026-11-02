import Image from 'next/image'
import React from 'react'

import type { Media as MediaDoc } from '@/payload-types'
import { cn } from '@/utilities/cn'

type Props = {
  resource?: MediaDoc | number | string | null
  className?: string
  imgClassName?: string
  /** Fill the (positioned) parent instead of using intrinsic size. */
  fill?: boolean
  sizes?: string
  priority?: boolean
  /** Serve the stored file as is (very tall captures, which the optimizer shrinks). */
  unoptimized?: boolean
}

/** Payload stores absolute URLs; next/image serves local files from relative paths. */
const toRelative = (url: string) => url.replace(/^https?:\/\/[^/]+/, '')

export function Media({ resource, className, imgClassName, fill, sizes, priority, unoptimized }: Props) {
  if (!resource || typeof resource !== 'object' || !resource.url) return null

  const src = toRelative(resource.url)
  const alt = resource.alt ?? ''

  if (resource.mimeType?.startsWith('video/')) {
    return (
      <video className={cn(imgClassName, className)} autoPlay muted loop playsInline>
        <source src={src} type={resource.mimeType} />
      </video>
    )
  }

  // Only an explicitly moved focal point overrides positioning classes like object-bottom.
  const hasFocal =
    resource.focalX != null &&
    resource.focalY != null &&
    !(resource.focalX === 50 && resource.focalY === 50)
  const focal = hasFocal ? { objectPosition: `${resource.focalX}% ${resource.focalY}%` } : undefined

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? '100vw'}
        priority={priority}
        className={cn('object-cover', imgClassName, className)}
        style={focal}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={resource.width ?? 1200}
      height={resource.height ?? 800}
      sizes={sizes ?? '(min-width: 1024px) 50vw, 100vw'}
      priority={priority}
      unoptimized={unoptimized}
      className={cn('h-auto w-full', imgClassName, className)}
      style={focal}
    />
  )
}
