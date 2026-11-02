import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { revalidateHooks } from '@/hooks/revalidate'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'שאלה נפוצה', plural: 'שאלות נפוצות' },
  orderable: true,
  access: { create: authenticated, read: anyone, update: authenticated, delete: authenticated },
  admin: { group: 'רכיבים', useAsTitle: 'question' },
  fields: [
    { name: 'question', type: 'text', label: 'שאלה', required: true },
    { name: 'answer', type: 'richText', label: 'תשובה', required: true },
  ],
  hooks: revalidateHooks,
}
