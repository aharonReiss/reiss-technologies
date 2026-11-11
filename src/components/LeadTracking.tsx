'use client'

import { useEffect } from 'react'

import { locationOf, track } from '@/utilities/track'

const WHATSAPP = /^https?:\/\/(wa\.me|api\.whatsapp\.com|(www\.)?whatsapp\.com)\//i

/**
 * One listener for every contact link on the site, present and future, wherever
 * it comes from (CMS links, header, footer, the floating button): WhatsApp, phone
 * and email clicks become events. Captured before the browser leaves the page.
 * Links marked `data-track="off"` are skipped (the WhatsApp form reports its own lead).
 */
export function LeadTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a || a.dataset.track === 'off') return
      const href = a.getAttribute('href') || ''
      const link_location = locationOf(a)
      if (WHATSAPP.test(href)) track('whatsapp_click', { link_location })
      else if (href.startsWith('tel:')) track('phone_click', { link_location })
      else if (href.startsWith('mailto:')) track('email_click', { link_location })
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])
  return null
}
