import type { Block } from 'payload'

import { linkGroup } from '@/fields/link'
import { anchorField, backgroundField } from '../shared'

export const ImageTextBlock: Block = {
  slug: 'imageText',
  interfaceName: 'ImageTextBlock',
  labels: { singular: 'תמונה + טקסט', plural: 'תמונה + טקסט' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'כותרת עליונה קטנה' },
    { name: 'heading', type: 'text', label: 'כותרת', required: true },
    { name: 'content', type: 'richText', label: 'תוכן' },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'תמונה' },
    {
      name: 'imagePosition',
      type: 'select',
      label: 'מיקום התמונה',
      defaultValue: 'end',
      options: [
        { label: 'משמאל', value: 'end' },
        { label: 'מימין', value: 'start' },
      ],
    },
    linkGroup(),
    backgroundField,
    anchorField,
  ],
}
