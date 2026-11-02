import Link from 'next/link'
import React from 'react'

import type { LinkAppearance } from '@/fields/link'
import { cn } from '@/utilities/cn'
import { docPath } from '@/utilities/routes'

export type CMSLinkData = {
  type?: ('reference' | 'custom') | null
  newTab?: boolean | null
  reference?: {
    relationTo: string
    value: number | string | { slug?: string | null }
  } | null
  url?: string | null
  label?: string | null
  appearance?: LinkAppearance | null
}

export function resolveHref(link?: CMSLinkData | null): string | null {
  if (!link) return null
  if (link.type === 'reference') {
    const value = link.reference?.value
    if (value && typeof value === 'object') return docPath(link.reference!.relationTo, value.slug)
    return null
  }
  return link.url || null
}

const appearanceClass: Record<LinkAppearance, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  link: 'font-semibold underline-offset-4 hover:underline',
}

type Props = {
  link?: CMSLinkData | null
  className?: string
  children?: React.ReactNode
  /** Overrides the appearance stored in the CMS. */
  appearance?: LinkAppearance | 'none'
}

export function CMSLink({ link, className, children, appearance }: Props) {
  const href = resolveHref(link)
  if (!href || !link) return null

  const look = appearance ?? link.appearance ?? 'none'
  const classes = cn(look !== 'none' && appearanceClass[look], className)
  const content = children ?? link.label
  const external = /^(https?:)?\/\//.test(href) || /^(mailto|tel):/.test(href)

  if (external || link.newTab) {
    return (
      <a
        href={href}
        className={classes}
        {...(link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}
