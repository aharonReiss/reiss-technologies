import React from 'react'

import { getGlobal } from '@/utilities/payload'
import { HeaderClient } from './HeaderClient'

export async function Header() {
  const [header, settings] = await Promise.all([
    getGlobal('header', 1),
    getGlobal('site-settings', 1),
  ])

  return (
    <HeaderClient
      navItems={header.navItems ?? []}
      cta={header.cta}
      siteName={settings.siteName ?? 'REISS DIGITAL'}
      // The header is dark, so it uses the dark-background upload.
      logo={typeof settings.logoLight === 'object' ? settings.logoLight : null}
      phone={settings.contact?.phone}
    />
  )
}
