import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { link } from '@/fields/link'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'פוטר',
  access: { read: anyone, update: authenticated },
  admin: { group: 'הגדרות' },
  fields: [
    { name: 'about', type: 'textarea', label: 'טקסט קצר מתחת ללוגו' },
    {
      name: 'columns',
      type: 'array',
      label: 'עמודות קישורים',
      maxRows: 4,
      labels: { singular: 'עמודה', plural: 'עמודות' },
      fields: [
        { name: 'title', type: 'text', label: 'כותרת העמודה', required: true },
        {
          name: 'links',
          type: 'array',
          label: 'קישורים',
          labels: { singular: 'קישור', plural: 'קישורים' },
          fields: [link({ appearances: false })],
        },
      ],
    },
    {
      name: 'bottomLinks',
      type: 'array',
      label: 'קישורים בשורה התחתונה',
      admin: { description: 'מדיניות פרטיות, הצהרת נגישות וכו׳' },
      labels: { singular: 'קישור', plural: 'קישורים' },
      fields: [link({ appearances: false })],
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'שורת זכויות',
      defaultValue: '© {year} REISS DIGITAL. כל הזכויות שמורות.',
      admin: { description: '{year} מוחלף אוטומטית בשנה הנוכחית' },
    },
  ],
  hooks: { afterChange: [revalidateGlobal] },
}
