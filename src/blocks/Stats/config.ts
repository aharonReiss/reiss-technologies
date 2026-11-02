import type { Block } from 'payload'

import { anchorField, backgroundField, sectionHeader } from '../shared'

export const StatsBlock: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: { singular: 'מספרים', plural: 'מספרים' },
  fields: [
    ...sectionHeader,
    {
      name: 'items',
      type: 'array',
      label: 'מספרים',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', label: 'ערך (למשל 150+)', required: true },
            { name: 'label', type: 'text', label: 'תיאור', required: true },
          ],
        },
      ],
    },
    { ...backgroundField, defaultValue: 'dark' } as typeof backgroundField,
    anchorField,
  ],
}
