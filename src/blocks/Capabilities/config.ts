import type { Block } from 'payload'

import { link } from '@/fields/link'
import { anchorField } from '../shared'

export const CapabilitiesBlock: Block = {
  slug: 'capabilities',
  interfaceName: 'CapabilitiesBlock',
  labels: { singular: 'יכולות (טיפוגרפי)', plural: 'יכולות (טיפוגרפי)' },
  fields: [
    {
      name: 'statement',
      type: 'text',
      label: 'משפט גדול',
      defaultValue: 'אסטרטגיה. עיצוב. פיתוח.',
      required: true,
      admin: { description: 'כל מילה שמסתיימת בנקודה עולה בנפרד' },
    },
    {
      name: 'items',
      type: 'array',
      label: 'יכולות',
      maxRows: 10,
      labels: { singular: 'יכולת', plural: 'יכולות' },
      fields: [{ name: 'text', type: 'text', label: 'יכולת', required: true }],
    },
    {
      name: 'note',
      type: 'textarea',
      label: 'הערה מסחרית',
      admin: { description: 'מה כלול בכל פרויקט ומה ניתן כשירות נוסף' },
    },
    { name: 'closing', type: 'textarea', label: 'משפט סיום' },
    link({ name: 'link', label: 'כפתור', appearances: false, required: false }),
    anchorField,
  ],
}
