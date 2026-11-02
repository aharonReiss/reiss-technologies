import type { Metadata } from 'next'
import React from 'react'

import { PageView, pageMetadata } from '@/components/PageView'
import { HOME_SLUG } from '@/utilities/routes'

export default function HomePage() {
  return <PageView slug={HOME_SLUG} />
}

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata(HOME_SLUG)
}
