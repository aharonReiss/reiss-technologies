import React from 'react'

import { Icon } from '@/components/Icon'
import { Section, SectionHeader } from '@/components/Section'
import type { FeatureGridBlock as FeatureGridBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'

const columnClass = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-2 lg:grid-cols-3',
  '4': 'md:grid-cols-2 lg:grid-cols-4',
}

export function FeatureGridBlock({
  eyebrow,
  heading,
  intro,
  items,
  columns,
  background,
  anchor,
}: FeatureGridBlockProps) {
  const dark = background === 'dark'
  return (
    <Section background={background} anchor={anchor}>
      <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro} />
      <ul className={cn('grid gap-5', columnClass[columns ?? '4'])}>
        {(items ?? []).map((item) => (
          <li
            key={item.id}
            className={cn(
              'rounded-card p-7 transition duration-300 hover:-translate-y-1',
              dark ? 'bg-ink-soft' : 'border border-line bg-white hover:shadow-xl hover:shadow-ink/5',
            )}
          >
            <span className="mb-6 grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand">
              <Icon name={item.icon ?? 'code'} className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
            {item.text && <p className="leading-relaxed">{item.text}</p>}
          </li>
        ))}
      </ul>
    </Section>
  )
}
