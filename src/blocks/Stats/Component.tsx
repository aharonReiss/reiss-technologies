import React from 'react'

import { Section, SectionHeader } from '@/components/Section'
import type { StatsBlock as StatsBlockProps } from '@/payload-types'

export function StatsBlock({ eyebrow, heading, intro, items, background, anchor }: StatsBlockProps) {
  return (
    <Section background={background} anchor={anchor} className="!py-16 md:!py-20">
      <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro} />
      <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {(items ?? []).map((item) => (
          <div key={item.id} className="border-s border-current/15 ps-6">
            <dt className="sr-only">{item.label}</dt>
            <dd>
              <span
                dir="ltr"
                className="block font-display text-5xl font-bold tracking-tight text-brand md:text-6xl"
              >
                {item.value}
              </span>
              <span className="mt-2 block text-[15px]" aria-hidden>
                {item.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
