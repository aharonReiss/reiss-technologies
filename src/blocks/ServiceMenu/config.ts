import type { Block } from 'payload'

import { link } from '@/fields/link'

import { anchorField } from '../shared'

export const ServiceMenuBlock: Block = {
  slug: 'serviceMenu',
  interfaceName: 'ServiceMenuBlock',
  labels: { singular: 'שירותים ומחירים (שורות נפתחות)', plural: 'שירותים ומחירים (שורות נפתחות)' },
  admin: { disableBlockName: true },
  fields: [
    { name: 'heading', type: 'text', label: 'כותרת (H1)', defaultValue: 'מה אנחנו מציעים.', required: true },
    { name: 'intro', type: 'textarea', label: 'פסקה' },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'שירותים',
      admin: {
        description:
          'ריק = כל השירותים שפורסמו, לפי הסדר ברשימת השירותים. התוכן של כל שורה נערך בשירות עצמו: "חבילה ומחיר" ו"עמוד מה אנחנו מציעים".',
      },
    },
    {
      name: 'note',
      type: 'text',
      label: 'הערה מתחת לשירותים',
      defaultValue: 'המחיר הסופי נקבע בהתאם לאפיון, להיקף העבודה ולצרכים של הפרויקט.',
    },
    { name: 'proofLead', type: 'text', label: 'שאלה לפני הקישור לפרויקטים', defaultValue: 'רוצים לראות איך זה נראה בפועל?' },
    link({ name: 'proof', label: 'קישור לפרויקטים (לא חובה)', required: false }),
    {
      name: 'contactPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'עמוד יצירת הקשר',
      admin: { description: 'ריק = /contact' },
    },
    anchorField,
  ],
}
