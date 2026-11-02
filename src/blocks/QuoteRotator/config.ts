import type { Block } from 'payload'

import { anchorField } from '../shared'

export const QuoteRotatorBlock: Block = {
  slug: 'quoteRotator',
  interfaceName: 'QuoteRotatorBlock',
  labels: { singular: 'המלצה אחת בכל פעם (מתחלפת)', plural: 'המלצה אחת בכל פעם (מתחלפת)' },
  admin: { disableBlockName: true },
  fields: [
    { name: 'label', type: 'text', label: 'כותרת קטנה', defaultValue: 'מילים של לקוחות.' },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      required: true,
      maxRows: 5,
      label: 'המלצות',
      admin: {
        description: 'מוצגת המלצה אחת בכל פעם, לפי הסדר כאן. המלצה שמסומנת "זמנית" מוצגת עם תווית שאומרת זאת.',
      },
    },
    anchorField,
  ],
}
