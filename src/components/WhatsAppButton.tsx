import React from 'react'

import { Icon } from '@/components/Icon'
import { getGlobal } from '@/utilities/payload'
import { WhatsAppFloat } from './WhatsAppFloat'

export async function WhatsAppButton() {
  const { contact } = await getGlobal('site-settings', 0)
  const number = contact?.whatsapp?.replace(/\D/g, '')
  if (!number) return null

  const text = contact?.whatsappMessage ? `?text=${encodeURIComponent(contact.whatsappMessage)}` : ''

  return (
    <WhatsAppFloat href={`https://wa.me/${number}${text}`}>
      <Icon name="whatsapp" className="size-7" />
    </WhatsAppFloat>
  )
}
