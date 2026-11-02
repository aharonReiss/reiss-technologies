import type { Block } from 'payload'

import { anchorField } from '../shared'

export const ContactStartBlock: Block = {
  slug: 'contactStart',
  interfaceName: 'ContactStartBlock',
  labels: { singular: 'פתיחת שיחה (וואטסאפ)', plural: 'פתיחת שיחה (וואטסאפ)' },
  admin: {
    // Shown above the block in the editor; the visitor-facing page states it too.
    disableBlockName: true,
  },
  fields: [
    {
      type: 'collapsible',
      label: 'פתיחה',
      fields: [
        { name: 'heading', type: 'text', label: 'כותרת (H1)', defaultValue: 'בואו נדבר על הפרויקט שלכם.', required: true },
        { name: 'intro', type: 'textarea', label: 'פסקה' },
      ],
    },
    {
      type: 'collapsible',
      label: 'הטופס',
      admin: {
        description:
          'הטופס לא שולח דבר לשרת: הוא מכין הודעה ופותח את WhatsApp, והמבקר שולח אותה בעצמו. המספר נלקח מ"הגדרות האתר ← פרטי קשר ← מספר WhatsApp"; בלי מספר, הכפתור מציג שהערוץ עדיין לא מחובר.',
      },
      fields: [
        {
          name: 'projectTypes',
          type: 'array',
          label: 'סוגי פרויקט',
          labels: { singular: 'סוג', plural: 'סוגים' },
          fields: [{ name: 'label', type: 'text', label: 'סוג', required: true }],
        },
        {
          name: 'greeting',
          type: 'text',
          label: 'פתיח ההודעה',
          defaultValue: 'היי אהרן, הגעתי דרך האתר של REISS DIGITAL 👋',
        },
        { name: 'signoff', type: 'text', label: 'סיום ההודעה', defaultValue: 'אשמח שנדבר!' },
        {
          name: 'directMessage',
          type: 'text',
          label: 'הודעה לפתיחת שיחה ישירה (בלי טופס)',
          defaultValue: 'היי אהרן, הגעתי דרך האתר של REISS DIGITAL ואשמח להתייעץ לגבי פרויקט.',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'שאלות נפוצות',
      fields: [
        { name: 'faqHeading', type: 'text', label: 'כותרת', defaultValue: 'עוד כמה דברים שאולי רציתם לדעת.' },
        {
          name: 'faqs',
          type: 'array',
          label: 'שאלות',
          maxRows: 6,
          labels: { singular: 'שאלה', plural: 'שאלות' },
          fields: [
            { name: 'question', type: 'text', label: 'שאלה', required: true },
            { name: 'answer', type: 'textarea', label: 'תשובה', required: true },
          ],
        },
      ],
    },
    anchorField,
  ],
}
