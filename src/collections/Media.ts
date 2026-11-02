import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'קובץ מדיה', plural: 'מדיה' },
  access: { create: authenticated, read: anyone, update: authenticated, delete: authenticated },
  admin: { group: 'תוכן' },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'טקסט חלופי (alt)',
      required: true,
      admin: { description: 'תיאור התמונה לנגישות ול־SEO' },
    },
    { name: 'caption', type: 'text', label: 'כיתוב' },
  ],
  upload: {
    focalPoint: true,
    mimeTypes: ['image/*', 'application/pdf', 'video/mp4'],
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 800 },
      { name: 'large', width: 1600 },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    formatOptions: { format: 'webp', options: { quality: 82 } },
  },
}
