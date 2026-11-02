import type { Block } from 'payload'

import { link } from '@/fields/link'
import { anchorField, backgroundField, sectionHeader } from '../shared'

export const BlogTeaserBlock: Block = {
  slug: 'blogTeaser',
  interfaceName: 'BlogTeaserBlock',
  labels: { singular: 'מאמרים מהבלוג', plural: 'מאמרים מהבלוג' },
  fields: [
    ...sectionHeader,
    {
      name: 'limit',
      type: 'number',
      label: 'כמות מאמרים',
      defaultValue: 3,
      admin: { description: '0 = כל המאמרים (לעמוד הבלוג הראשי)' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'סינון לפי קטגוריה (אופציונלי)',
    },
    { name: 'showLink', type: 'checkbox', label: 'הצג כפתור בסוף האזור' },
    {
      ...link({ appearances: false, required: false }),
      admin: { condition: (_, s) => Boolean(s?.showLink) },
    },
    backgroundField,
    anchorField,
  ],
}
