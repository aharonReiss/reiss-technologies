import React from 'react'

import { ServiceCard } from '@/components/Cards'
import { Section, SectionHeader } from '@/components/Section'
import type { Service, ServicesGridBlock as ServicesGridBlockProps } from '@/payload-types'
import { getPayloadClient } from '@/utilities/payload'

export async function ServicesGridBlock({
  eyebrow,
  heading,
  intro,
  services: selected,
  background,
  anchor,
}: ServicesGridBlockProps) {
  let services = (selected ?? []).filter((s): s is Service => typeof s === 'object')

  if (services.length === 0) {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'services',
      sort: '_order',
      limit: 12,
      depth: 1,
      overrideAccess: false,
    })
    services = res.docs
  }

  return (
    <Section background={background} anchor={anchor}>
      <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <div key={service.id} data-reveal style={{ '--i': i % 3 } as React.CSSProperties}>
            <ServiceCard service={service} index={i} />
          </div>
        ))}
      </div>
    </Section>
  )
}
