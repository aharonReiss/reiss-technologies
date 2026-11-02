import type { Block } from 'payload'

import { link } from '@/fields/link'

import { anchorField } from '../shared'

export const StatementBlock: Block = {
  slug: 'statement',
  interfaceName: 'StatementBlock',
  labels: { singular: 'משפט מרכזי (רקע כחול כהה)', plural: 'משפט מרכזי (רקע כחול כהה)' },
  admin: { disableBlockName: true },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'כותרת',
      required: true,
      admin: { description: 'הקיפו ביטוי קצר בכוכביות כדי לצבוע אותו בכחול, למשל: לא משנה הגודל. *חשוב לנו שזה יהיה מדויק.*' },
    },
    { name: 'text', type: 'textarea', label: 'טקסט' },
    link({ name: 'cta', label: 'כפתור (לא חובה)', required: false }),
    {
      name: 'ctaNote',
      type: 'text',
      label: 'שורה קטנה מתחת לכפתור',
    },
    anchorField,
  ],
}
