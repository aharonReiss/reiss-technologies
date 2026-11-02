import type { Block } from 'payload'

import { link } from '@/fields/link'
import { anchorField } from '../shared'

export const ServiceStackBlock: Block = {
  slug: 'serviceStack',
  interfaceName: 'ServiceStackBlock',
  labels: { singular: 'שירותים (כרטיסים נערמים)', plural: 'שירותים (כרטיסים נערמים)' },
  fields: [
    { name: 'heading', type: 'text', label: 'כותרת', defaultValue: 'מה אנחנו יודעים לעשות.', required: true },
    {
      name: 'cards',
      type: 'array',
      label: 'כרטיסים',
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: { singular: 'כרטיס', plural: 'כרטיסים' },
      admin: {
        description:
          'בגלילה כל כרטיס עולה ונערם על הקודם, ופס עליון של הקודמים נשאר גלוי. הסדר כאן הוא סדר ההופעה, והמספור (01 / 03) מחושב ממנו.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'סוג השירות',
          required: true,
          admin: { description: 'השם המוכר של השירות, למשל: אתרי תדמית ואתרי מותג' },
        },
        {
          name: 'title',
          type: 'textarea',
          label: 'כותרת גדולה',
          required: true,
          admin: { description: 'קצרה ומשפט אחד. אפשר לשבור שורה ב־Enter' },
        },
        { name: 'description', type: 'textarea', label: 'מה הלקוח מקבל', required: true },
        {
          name: 'theme',
          type: 'select',
          label: 'צבעים',
          defaultValue: 'white',
          required: true,
          options: [
            { label: 'לבן, טקסט כחול כהה', value: 'white' },
            { label: 'לבן קריר, טקסט כחול כהה', value: 'light' },
            { label: 'כחול חשמלי, טקסט לבן', value: 'brand' },
            { label: 'כחול כהה, טקסט לבן', value: 'dark' },
          ],
        },
        link({ name: 'link', label: 'קישור לפרטים', appearances: false, required: false }),
      ],
    },
    { ...anchorField, defaultValue: 'services' } as typeof anchorField,
  ],
}
