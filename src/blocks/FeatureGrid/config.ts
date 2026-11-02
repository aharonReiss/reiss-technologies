import type { Block } from 'payload'

import { iconField } from '@/fields/icon'
import { anchorField, backgroundField, sectionHeader } from '../shared'

export const FeatureGridBlock: Block = {
  slug: 'featureGrid',
  interfaceName: 'FeatureGridBlock',
  labels: { singular: 'רשת יתרונות / קהלים', plural: 'רשת יתרונות' },
  fields: [
    ...sectionHeader,
    {
      name: 'items',
      type: 'array',
      label: 'פריטים',
      minRows: 1,
      maxRows: 8,
      labels: { singular: 'פריט', plural: 'פריטים' },
      fields: [
        {
          type: 'row',
          fields: [
            iconField({ admin: { width: '30%' } }),
            { name: 'title', type: 'text', label: 'כותרת', required: true, admin: { width: '70%' } },
          ],
        },
        { name: 'text', type: 'textarea', label: 'טקסט' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      label: 'עמודות',
      defaultValue: '4',
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
    },
    backgroundField,
    anchorField,
  ],
}
