import type { Block } from 'payload'

import { anchorField, backgroundField, sectionHeader } from '../shared'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: { singular: 'המלצות', plural: 'המלצות' },
  fields: [
    ...sectionHeader,
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      label: 'המלצות להצגה',
      admin: { description: 'השאר ריק כדי להציג את כל ההמלצות' },
    },
    backgroundField,
    anchorField,
  ],
}
