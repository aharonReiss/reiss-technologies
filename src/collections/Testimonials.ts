import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { revalidateHooks } from '@/hooks/revalidate'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'המלצה', plural: 'המלצות' },
  orderable: true,
  access: { create: authenticated, read: anyone, update: authenticated, delete: authenticated },
  admin: { group: 'רכיבים', useAsTitle: 'name', defaultColumns: ['name', 'company', 'rating'] },
  fields: [
    { name: 'quote', type: 'textarea', label: 'ההמלצה', required: true },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', label: 'שם', required: true },
        { name: 'role', type: 'text', label: 'תפקיד' },
        { name: 'company', type: 'text', label: 'חברה' },
      ],
    },
    { name: 'avatar', type: 'upload', relationTo: 'media', label: 'תמונה' },
    { name: 'rating', type: 'number', label: 'דירוג (1-5)', min: 1, max: 5, defaultValue: 5 },
    { name: 'project', type: 'relationship', relationTo: 'projects', label: 'פרויקט (לא חובה)' },
    {
      name: 'placeholder',
      type: 'checkbox',
      label: 'המלצה זמנית',
      admin: { description: 'מסומן = מוצגת באתר עם תווית "המלצה זמנית". מבטלים את הסימון כשמזינים המלצה אמיתית.' },
    },
  ],
  hooks: revalidateHooks,
}
