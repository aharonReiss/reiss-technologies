import React from 'react'

import { Icon } from '@/components/Icon'
import { Media } from '@/components/Media'
import { Section, SectionHeader } from '@/components/Section'
import type { Testimonial, TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import { getPayloadClient } from '@/utilities/payload'

export async function TestimonialsBlock({
  eyebrow,
  heading,
  intro,
  testimonials: selected,
  background,
  anchor,
}: TestimonialsBlockProps) {
  let testimonials = (selected ?? []).filter((t): t is Testimonial => typeof t === 'object')

  if (testimonials.length === 0) {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'testimonials',
      sort: '_order',
      limit: 9,
      depth: 1,
    })
    testimonials = res.docs
  }

  const dark = background === 'dark'

  return (
    <Section background={background} anchor={anchor}>
      <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro} />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure
            key={t.id}
            data-reveal
            style={{ '--i': i % 3 } as React.CSSProperties}
            className={`flex flex-col rounded-card p-8 ${dark ? 'bg-ink-soft' : 'border border-line bg-white'}`}
          >
            <div className="mb-6">
              <div className="flex gap-0.5 text-amber-400" aria-label={`דירוג ${t.rating ?? 5} מתוך 5`}>
                {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                  <Icon key={i} name="star" className="size-4" />
                ))}
              </div>
            </div>
            <blockquote className={`mb-8 text-lg leading-relaxed ${dark ? 'text-white' : 'text-ink'}`}>
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3">
              {t.avatar && typeof t.avatar === 'object' ? (
                <span className="relative size-12 overflow-hidden rounded-full">
                  <Media resource={t.avatar} fill sizes="48px" />
                </span>
              ) : (
                <span className="grid size-12 place-items-center rounded-full bg-brand-soft font-bold text-brand">
                  {t.name.charAt(0)}
                </span>
              )}
              <span>
                <span className={`block font-semibold ${dark ? 'text-white' : 'text-ink'}`}>
                  {t.name}
                </span>
                <span className="block text-sm">
                  {[t.role, t.company].filter(Boolean).join(', ')}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
