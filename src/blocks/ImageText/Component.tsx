import React from 'react'

import { CMSLink } from '@/components/CMSLink'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import { Eyebrow, Highlight, Section } from '@/components/Section'
import type { ImageTextBlock as ImageTextBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'

export function ImageTextBlock({
  eyebrow,
  heading,
  content,
  image,
  imagePosition,
  links,
  background,
  anchor,
}: ImageTextBlockProps) {
  return (
    <Section background={background} anchor={anchor}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div data-reveal className={cn(imagePosition === 'start' && 'lg:order-2')}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 className="mb-6 text-3xl leading-tight font-bold md:text-[2.75rem]">
            <Highlight text={heading} />
          </h2>
          <RichText data={content} />
          {links && links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {links.map(({ id, link }) => (
                <CMSLink key={id} link={link} />
              ))}
            </div>
          )}
        </div>
        {image && (
          <div data-reveal="wipe" className="relative aspect-[5/4] overflow-hidden rounded-[2rem]">
            <Media resource={image} fill sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        )}
      </div>
    </Section>
  )
}
