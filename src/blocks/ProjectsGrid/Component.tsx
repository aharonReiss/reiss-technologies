import React from 'react'

import { ProjectCard } from '@/components/Cards'
import { CMSLink } from '@/components/CMSLink'
import { Section, SectionHeader } from '@/components/Section'
import type { Project, ProjectsGridBlock as ProjectsGridBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { getPayloadClient } from '@/utilities/payload'

export async function ProjectsGridBlock({
  eyebrow,
  heading,
  intro,
  mode,
  projects: selected,
  limit,
  showLink,
  link,
  background,
  anchor,
}: ProjectsGridBlockProps) {
  let projects: Project[] = []

  if (mode === 'selected') {
    projects = (selected ?? []).filter((p): p is Project => typeof p === 'object')
  } else {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'projects',
      where: mode === 'featured' ? { featured: { equals: true } } : undefined,
      sort: '_order',
      limit: limit || 0,
      pagination: Boolean(limit),
      depth: 1,
      overrideAccess: false,
    })
    projects = res.docs
  }

  return (
    <Section background={background} anchor={anchor}>
      <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro}>
        {showLink && link && <CMSLink link={link} appearance="secondary" className="shrink-0" />}
      </SectionHeader>
      <div className="grid gap-x-6 gap-y-14 md:grid-cols-2">
        {projects.map((project, i) => (
          <div
            key={project.id}
            data-reveal
            style={{ '--i': i % 2 } as React.CSSProperties}
            className={cn(i % 2 === 1 && 'md:mt-24')}
          >
            <ProjectCard project={project} large />
          </div>
        ))}
      </div>
    </Section>
  )
}
