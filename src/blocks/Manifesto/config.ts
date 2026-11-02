import type { Block } from 'payload'

import { link } from '@/fields/link'
import { anchorField } from '../shared'

export const ManifestoBlock: Block = {
  slug: 'manifesto',
  interfaceName: 'ManifestoBlock',
  labels: { singular: 'מניפסט וגישה', plural: 'מניפסט וגישה' },
  fields: [
    {
      name: 'question',
      type: 'textarea',
      label: 'כותרת',
      admin: { description: 'כל שורה עולה בנפרד; השורה האחרונה גדולה ובכחול. למשל: אתם לא צריכים להבין בבניית אתרים. ⏎ בשביל זה אנחנו כאן.' },
    },
    {
      name: 'lines',
      type: 'array',
      label: 'שורות המניפסט (לא חובה)',
      maxRows: 4,
      labels: { singular: 'שורה', plural: 'שורות' },
      admin: { description: 'כל שורה נחשפת בתורה. הנקודה הכחולה בסוף נוספת אוטומטית.' },
      fields: [{ name: 'text', type: 'text', label: 'טקסט', required: true }],
    },
    {
      name: 'approach',
      type: 'textarea',
      label: 'פסקת הגישה',
      admin: { description: 'התשובה שלנו, מוצגת מתחת למניפסט. *כוכביות* מסמנות מילים שנשארות כחולות.' },
    },
    {
      name: 'person',
      type: 'group',
      label: 'מי עומד מאחורי הסטודיו',
      admin: { description: 'היכרות קצרה לצד פסקת הגישה. 2–3 משפטים, רק מידע אמיתי.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', label: 'שם', admin: { width: '50%' } },
            { name: 'role', type: 'text', label: 'תפקיד', admin: { width: '50%' } },
          ],
        },
        { name: 'text', type: 'textarea', label: 'היכרות קצרה' },
        {
          type: 'row',
          fields: [
            {
              name: 'portrait',
              type: 'upload',
              relationTo: 'media',
              label: 'תמונה',
              admin: { width: '50%', description: 'PNG עם רקע שקוף (גזורה), באותו גודל כמו תמונת החיוך' },
            },
            {
              name: 'portraitSmile',
              type: 'upload',
              relationTo: 'media',
              label: 'תמונה מחייכת (לא חובה)',
              admin: { width: '50%', description: 'אותה תמונה עם חיוך: מתחלפת בריחוף בדסקטופ ופעם אחת בנייד' },
            },
          ],
        },
      ],
    },
    {
      name: 'index',
      type: 'array',
      label: 'תפריט המשך (ממוספר)',
      maxRows: 6,
      labels: { singular: 'קישור', plural: 'קישורים' },
      fields: [link({ appearances: false })],
    },
    anchorField,
  ],
}
