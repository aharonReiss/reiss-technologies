import type { Block } from 'payload'

import { linkGroup } from '@/fields/link'
import { anchorField, backgroundField } from '../shared'

export const DeviceShowcaseBlock: Block = {
  slug: 'deviceShowcase',
  interfaceName: 'DeviceShowcaseBlock',
  labels: { singular: 'תצוגת מכשירים', plural: 'תצוגת מכשירים' },
  fields: [
    {
      name: 'source',
      type: 'radio',
      label: 'מקור הצילומים',
      defaultValue: 'project',
      options: [
        { label: 'מפרויקט קיים', value: 'project' },
        { label: 'העלאה ידנית', value: 'custom' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      label: 'פרויקט',
      admin: {
        condition: (_, s) => s?.source !== 'custom',
        description: 'הצילומים וכתובת האתר נלקחים מלשונית "תצוגת מכשירים" של הפרויקט',
      },
    },
    {
      type: 'row',
      admin: { condition: (_, s) => s?.source === 'custom' },
      fields: [
        { name: 'desktop', type: 'upload', relationTo: 'media', label: 'צילום דסקטופ' },
        { name: 'mobile', type: 'upload', relationTo: 'media', label: 'צילום מובייל' },
      ],
    },
    {
      name: 'url',
      type: 'text',
      label: 'כתובת בשורת הדפדפן',
      admin: { condition: (_, s) => s?.source === 'custom' },
    },
    { name: 'badge', type: 'text', label: 'תווית', defaultValue: 'מהמערכת האמיתית' },
    { name: 'eyebrow', type: 'text', label: 'כותרת עליונה קטנה' },
    { name: 'heading', type: 'text', label: 'כותרת' },
    { name: 'text', type: 'textarea', label: 'טקסט' },
    {
      name: 'bullets',
      type: 'array',
      label: 'נקודות',
      maxRows: 5,
      labels: { singular: 'נקודה', plural: 'נקודות' },
      fields: [{ name: 'text', type: 'text', required: true, label: 'טקסט' }],
    },
    linkGroup(),
    {
      name: 'devicesPosition',
      type: 'select',
      label: 'מיקום המכשירים',
      defaultValue: 'end',
      options: [
        { label: 'משמאל לטקסט', value: 'end' },
        { label: 'מימין לטקסט', value: 'start' },
      ],
    },
    backgroundField,
    anchorField,
  ],
}
