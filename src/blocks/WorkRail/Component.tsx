import React from 'react'

import { resolveHref } from '@/components/CMSLink'
import type { Media, Project, Testimonial, WorkRailBlock as WorkRailBlockProps } from '@/payload-types'
import { docPath } from '@/utilities/routes'
import { WorkRail, type WorkCard } from './WorkRail'

const url = (m: unknown) => (m && typeof m === 'object' ? ((m as Media).url ?? null) : null)

export function WorkRailBlock({ heading, items, closingTitle, closingLink, anchor }: WorkRailBlockProps) {
  const cards: WorkCard[] = (items ?? []).flatMap(({ project, tone }) => {
    if (!project || typeof project !== 'object') return []
    const p = project as Project
    return [
      {
        title: p.title.split(/[,،]/)[0].trim(),
        excerpt: p.excerpt,
        // The excerpt's lead clause (before the colon) is the one-line mobile summary.
        summary: p.excerpt.split(/[:：]/)[0].trim(),
        tags: (p.tags ?? []).join(' · '),
        need: p.need?.trim() || null,
        answer: p.answer?.trim() || null,
        // Only a testimonial actually linked to the project, in the client's own words.
        quote:
          p.testimonial && typeof p.testimonial === 'object'
            ? { text: (p.testimonial as Testimonial).quote, by: (p.testimonial as Testimonial).name }
            : null,
        desktop: url(p.desktopScreenshot) ?? url(p.coverImage),
        mobile: url(p.mobileScreenshot),
        // The live site when there is one; otherwise the internal case study.
        // Cards always open the case study; the live site is linked from inside it.
        href: p.slug ? docPath('projects', p.slug) : null,
        tone: /^#[0-9a-f]{6}$/i.test(tone ?? '') ? tone! : '#0d1020',
      },
    ]
  })
  if (!cards.length) return null

  return (
    <WorkRail
      id={anchor || undefined}
      heading={heading}
      cards={cards}
      closing={closingTitle ? { title: closingTitle, label: closingLink?.label ?? null, href: resolveHref(closingLink) } : null}
    />
  )
}
