import type { Block } from 'payload'

import { anchorField, backgroundField } from '../shared'

export const RichTextBlock: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlock',
  labels: { singular: 'טקסט עשיר', plural: 'טקסט עשיר' },
  fields: [
    { name: 'content', type: 'richText', label: 'תוכן', required: true },
    {
      name: 'width',
      type: 'select',
      label: 'רוחב',
      defaultValue: 'narrow',
      options: [
        { label: 'צר (נוח לקריאה)', value: 'narrow' },
        { label: 'רחב', value: 'wide' },
      ],
    },
    backgroundField,
    anchorField,
  ],
}
