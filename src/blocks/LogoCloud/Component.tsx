import React from 'react'

import { Media } from '@/components/Media'
import { Section } from '@/components/Section'
import type { Client, LogoCloudBlock as LogoCloudBlockProps } from '@/payload-types'
import { getPayloadClient } from '@/utilities/payload'

export async function LogoCloudBlock({
  heading,
  clients: selected,
  background,
  anchor,
}: LogoCloudBlockProps) {
  let clients = (selected ?? []).filter((c): c is Client => typeof c === 'object')

  if (clients.length === 0) {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'clients', sort: '_order', limit: 30, depth: 1 })
    clients = res.docs
  }
  if (clients.length === 0) return null

  // Duplicated once so the marquee loops seamlessly.
  const loop = [...clients, ...clients]

  return (
    <Section background={background} anchor={anchor} className="!py-14">
      {heading && <p className="mb-8 text-center text-sm font-semibold tracking-wide">{heading}</p>}
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-16 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {loop.map((client, i) => (
            <li key={`${client.id}-${i}`} aria-hidden={i >= clients.length}>
              <Media
                resource={client.logo}
                imgClassName="h-10 w-auto opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                sizes="160px"
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
