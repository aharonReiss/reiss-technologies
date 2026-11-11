import React from 'react'

import type { Project, QuoteRotatorBlock as QuoteRotatorBlockProps, Testimonial } from '@/payload-types'
import { docPath } from '@/utilities/routes'
import { QuoteRotator, type Quote } from './QuoteRotator'

/**
 * Maps the chosen testimonials to plain data; the client part only presents them.
 * Real testimonials only: with none, the whole section (label included) is left out.
 */
export function QuoteRotatorBlock({ label, testimonials, anchor }: QuoteRotatorBlockProps) {
  const items: Quote[] = (testimonials ?? [])
    .filter((t): t is Testimonial => typeof t === 'object' && !t.placeholder)
    .map((t) => {
      const project = t.project && typeof t.project === 'object' ? (t.project as Project) : null
      return {
        id: t.id,
        quote: t.quote,
        name: t.name,
        business: t.company ?? null,
        href: project?.slug ? docPath('projects', project.slug) : null,
        placeholder: !!t.placeholder,
      }
    })
  if (items.length === 0) return null
  return <QuoteRotator label={label} items={items} anchor={anchor} />
}
