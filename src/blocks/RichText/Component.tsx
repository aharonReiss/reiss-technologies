import React from 'react'

import { RichText } from '@/components/RichText'
import { Section } from '@/components/Section'
import type { RichTextBlock as RichTextBlockProps } from '@/payload-types'

export function RichTextBlock({ content, width, background, anchor }: RichTextBlockProps) {
  return (
    <Section background={background} anchor={anchor}>
      <RichText data={content} className={width === 'wide' ? 'max-w-none' : 'mx-auto max-w-3xl'} />
    </Section>
  )
}
