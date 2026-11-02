import type { Block } from 'payload'

import { linkGroup } from '@/fields/link'
import { anchorField, backgroundField, signatureFields } from '../shared'

export const FounderBlock: Block = {
  slug: 'founder',
  interfaceName: 'FounderBlock',
  labels: { singular: 'האני מאמין / מייסד', plural: 'האני מאמין' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'כותרת עליונה קטנה', defaultValue: 'האני מאמין שלי' },
    {
      name: 'quote',
      type: 'textarea',
      label: 'הציטוט המרכזי',
      required: true,
      admin: { description: 'מוצג בגדול. *כוכביות* מדגישות בצבע המותג' },
    },
    { name: 'text', type: 'textarea', label: 'פסקה נוספת' },
    { name: 'portrait', type: 'upload', relationTo: 'media', label: 'תמונה (רקע שקוף)' },
    signatureFields,
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', label: 'שם' },
        { name: 'role', type: 'text', label: 'תפקיד' },
      ],
    },
    linkGroup(),
    backgroundField,
    { ...anchorField, defaultValue: 'about' } as typeof anchorField,
  ],
}
