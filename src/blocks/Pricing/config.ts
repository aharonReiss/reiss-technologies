import type { Block } from 'payload'

import { anchorField, backgroundField, sectionHeader } from '../shared'

export const PricingBlock: Block = {
  slug: 'pricing',
  interfaceName: 'PricingBlock',
  labels: { singular: 'חבילות ומחירים', plural: 'חבילות ומחירים' },
  fields: [
    ...sectionHeader,
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'חבילות להצגה',
      admin: {
        description: 'השאר ריק כדי להציג את כל השירותים לפי הסדר. המחירים נערכים בלשונית "חבילה ומחיר" של כל שירות',
      },
    },
    {
      name: 'contactPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'עמוד יצירת קשר',
      admin: { description: 'כפתור "לקבלת הצעה" מוביל לכאן, עם החבילה כבר מסומנת בטופס' },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'טקסט הכפתור',
      defaultValue: 'לקבלת הצעה',
    },
    {
      name: 'note',
      type: 'textarea',
      label: 'הערה מתחת לחבילות',
      defaultValue: 'המחירים לפני מע״מ. ההיקף המדויק נקבע באפיון, ולוח הזמנים תלוי גם בקבלת התכנים מכם.',
    },
    { ...backgroundField, defaultValue: 'muted' } as typeof backgroundField,
    { ...anchorField, defaultValue: 'pricing' } as typeof anchorField,
  ],
}
