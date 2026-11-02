import type { Block } from 'payload'

import { anchorField, backgroundField, sectionHeader } from '../shared'

export const FAQBlock: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: { singular: 'שאלות נפוצות', plural: 'שאלות נפוצות' },
  fields: [
    ...sectionHeader,
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      label: 'שאלות להצגה',
      admin: { description: 'השאר ריק כדי להציג את כל השאלות לפי הסדר שנקבע' },
    },
    backgroundField,
    { ...anchorField, defaultValue: 'faq' } as typeof anchorField,
  ],
}
