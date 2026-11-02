import type { Block } from 'payload'

import { link } from '@/fields/link'
import { anchorField } from '../shared'

const starHint = 'הקיפו חלק בכוכביות כדי לצבוע אותו בכחול ולהעביר אותו לשורה משלו, למשל: עיצוב שחושב קדימה. *פיתוח שיודע לבצע.*'

/**
 * The about page as one composed experience: a blueprint that becomes a product,
 * the years of development as a numeral that fills with layers, the founder,
 * one real decision from a real project, and a calm closing.
 */
export const AboutStudioBlock: Block = {
  slug: 'aboutStudio',
  dbName: 'about',
  interfaceName: 'AboutStudioBlock',
  labels: { singular: 'עמוד אודות (הסטודיו)', plural: 'עמוד אודות (הסטודיו)' },
  admin: { disableBlockName: true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'פתיחה',
          name: 'intro',
          fields: [
            { name: 'eyebrow', type: 'text', label: 'כותרת קטנה' },
            { name: 'heading', type: 'text', label: 'כותרת', required: true, admin: { description: starHint } },
            { name: 'text', type: 'textarea', label: 'פסקה' },
          ],
        },
        {
          label: 'ניסיון',
          name: 'experience',
          fields: [
            { name: 'eyebrow', type: 'text', label: 'כותרת קטנה' },
            { name: 'years', type: 'number', label: 'מספר השנים', required: true, min: 1, max: 99 },
            { name: 'label', type: 'text', label: 'מה המספר מודד (מופיע אחרי המספר)', required: true },
            { name: 'text', type: 'textarea', label: 'פסקה' },
            { name: 'points', type: 'array', label: 'תחומי ניסיון', maxRows: 4, fields: [{ name: 'text', type: 'text', required: true, label: 'תחום' }] },
          ],
        },
        {
          label: 'המייסד',
          name: 'founder',
          fields: [
            { name: 'eyebrow', type: 'text', label: 'כותרת קטנה' },
            { name: 'headline', type: 'text', label: 'כותרת' },
            { name: 'name', type: 'text', label: 'שם', required: true },
            { name: 'role', type: 'text', label: 'תפקיד' },
            { name: 'text', type: 'textarea', label: 'פסקאות (שורה ריקה בין פסקה לפסקה)' },
            { name: 'portrait', type: 'upload', relationTo: 'media', label: 'תמונה (PNG שקוף)', required: true },
          ],
        },
        {
          label: 'מהעבודה',
          name: 'proof',
          fields: [
            { name: 'eyebrow', type: 'text', label: 'כותרת קטנה' },
            { name: 'heading', type: 'text', label: 'כותרת', required: true, admin: { description: starHint } },
            { name: 'text', type: 'textarea', label: 'ההחלטה ולמה היא חשובה' },
            { name: 'project', type: 'relationship', relationTo: 'projects', label: 'הפרויקט (לקישור)' },
            { name: 'linkLabel', type: 'text', label: 'טקסט הקישור', defaultValue: 'לסיפור הפרויקט המלא' },
            {
              name: 'screens',
              type: 'array',
              label: 'מסכים (מתחלפים בגלילה, מימין לשמאל)',
              minRows: 2,
              maxRows: 3,
              fields: [
                { name: 'label', type: 'text', label: 'שם (למשל עברית)', required: true },
                {
                  type: 'row',
                  fields: [
                    { name: 'desktop', type: 'upload', relationTo: 'media', label: 'מחשב (16:10)', required: true },
                    { name: 'phone', type: 'upload', relationTo: 'media', label: 'טלפון (390:844)', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'סיום',
          name: 'closing',
          fields: [
            { name: 'heading', type: 'text', label: 'כותרת', required: true, admin: { description: starHint } },
            { name: 'text', type: 'textarea', label: 'פסקה' },
            link({ name: 'primary', label: 'קישור ראשי' }),
            link({ name: 'secondary', label: 'קישור משני', required: false }),
          ],
        },
      ],
    },
    anchorField,
  ],
}
