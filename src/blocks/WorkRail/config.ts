import type { Block } from 'payload'

import { link } from '@/fields/link'
import { anchorField } from '../shared'

export const WorkRailBlock: Block = {
  slug: 'workRail',
  interfaceName: 'WorkRailBlock',
  labels: { singular: 'עבודות נבחרות (גלילה אופקית)', plural: 'עבודות נבחרות (גלילה אופקית)' },
  fields: [
    { name: 'heading', type: 'text', label: 'כותרת', defaultValue: 'עבודות', required: true },
    {
      name: 'items',
      type: 'array',
      label: 'פרויקטים',
      minRows: 1,
      maxRows: 8,
      required: true,
      labels: { singular: 'פרויקט', plural: 'פרויקטים' },
      admin: { description: 'הגלילה האנכית מזיזה את הכרטיסים לרוחב. התמונות נלקחות מ"תצוגת מכשירים" בפרויקט.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'project', type: 'relationship', relationTo: 'projects', label: 'פרויקט', required: true, admin: { width: '60%' } },
            {
              name: 'tone',
              type: 'text',
              label: 'גוון רקע (HEX)',
              admin: { width: '40%', description: 'הרקע מקבל את הגוון כשהכרטיס במרכז, למשל #1d2a63' },
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'closingTitle', type: 'text', label: 'כרטיס סיום: כותרת', defaultValue: 'הפרויקט הבא יכול להיות שלכם', admin: { width: '50%' } },
      ],
    },
    { ...link({ name: 'closingLink', label: 'כרטיס סיום: קישור', appearances: false, required: false }) },
    { ...anchorField, defaultValue: 'work' } as typeof anchorField,
  ],
}
