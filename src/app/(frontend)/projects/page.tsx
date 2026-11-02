import type { Metadata } from 'next'
import React from 'react'

import { PageView, pageMetadata } from '@/components/PageView'

// The portfolio index is a CMS page; it lives here because /projects/[slug] claims the segment.
export default function ProjectsPage() {
  return <PageView slug="projects" />
}

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata('projects')
}
