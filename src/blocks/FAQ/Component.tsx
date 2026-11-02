import React from 'react'

import { Icon } from '@/components/Icon'
import { RichText } from '@/components/RichText'
import { Section, SectionHeader } from '@/components/Section'
import type { FAQBlock as FAQBlockProps, Faq } from '@/payload-types'
import { getPayloadClient } from '@/utilities/payload'

export async function FAQBlock({
  eyebrow,
  heading,
  intro,
  faqs: selected,
  background,
  anchor,
}: FAQBlockProps) {
  let faqs = (selected ?? []).filter((f): f is Faq => typeof f === 'object')

  if (faqs.length === 0) {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'faqs', sort: '_order', limit: 50, depth: 1 })
    faqs = res.docs
  }

  return (
    <Section background={background} anchor={anchor}>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro} className="lg:sticky lg:top-28" />
        </div>
        <div className="divide-y divide-current/10 border-y border-current/10 lg:col-span-8">
          {faqs.map((faq, i) => (
            <details
              key={faq.id}
              name={`faq-${anchor || 'list'}`}
              data-reveal
              style={{ '--i': i } as React.CSSProperties}
              className="faq-item group py-2 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-lg font-semibold text-ink md:text-xl [.section-dark_&]:text-white">
                {faq.question}
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-current/15 transition group-open:rotate-45 group-open:border-brand group-open:bg-brand group-open:text-white">
                  <Icon name="plus" className="size-4" />
                </span>
              </summary>
              <div className="pb-6 pe-12">
                <RichText data={faq.answer} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}
