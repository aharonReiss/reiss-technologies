import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { revalidateHooks } from '@/hooks/revalidate'

export const Clients: CollectionConfig = {
  slug: 'clients',
  labels: { singular: 'לקוח', plural: 'לקוחות' },
  orderable: true,
  access: { create: authenticated, read: anyone, update: authenticated, delete: authenticated },
  admin: { group: 'רכיבים', useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', label: 'שם', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media', label: 'לוגו', required: true },
    { name: 'url', type: 'text', label: 'אתר' },
  ],
  hooks: revalidateHooks,
}
