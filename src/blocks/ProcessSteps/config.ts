import type { Block } from 'payload'

import { anchorField, backgroundField, sectionHeader } from '../shared'

export const ProcessStepsBlock: Block = {
  slug: 'processSteps',
  interfaceName: 'ProcessStepsBlock',
  labels: { singular: 'תהליך עבודה', plural: 'תהליך עבודה' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'תצוגה',
      defaultValue: 'grid',
      options: [
        { label: 'כרטיסים ברשת', value: 'grid' },
        { label: 'רצף טיפוגרפי עם קו התקדמות', value: 'timeline' },
        { label: 'שורה קומפקטית (ארבעה שלבים בשורה)', value: 'row' },
      ],
    },
    ...sectionHeader,
    {
      name: 'steps',
      type: 'array',
      label: 'שלבים',
      minRows: 1,
      labels: { singular: 'שלב', plural: 'שלבים' },
      fields: [
        { name: 'title', type: 'text', label: 'כותרת', required: true },
        { name: 'description', type: 'textarea', label: 'תיאור' },
      ],
    },
    {
      name: 'outro',
      type: 'group',
      label: 'מאחורי הקלעים (ברצף הטיפוגרפי)',
      admin: {
        condition: (_, siblingData) => siblingData?.variant === 'timeline',
        description: 'שורת יכולות קצרה אחרי השלבים, שנצבעת בכחול בגלילה.',
      },
      fields: [
        { name: 'question', type: 'text', label: 'שאלה', admin: { description: 'למשל: ומה עם כל מה שמאחורי הקלעים?' } },
        { name: 'words', type: 'text', label: 'היכולות', admin: { description: 'מילים שמסתיימות בנקודה, למשל: אפיון. UX/UI. פיתוח.' } },
        { name: 'note', type: 'text', label: 'הערה', admin: { description: 'למשל: הפתרון והיקף השירותים נקבעים בהתאם לצרכים של כל פרויקט.' } },
      ],
    },
    backgroundField,
    anchorField,
  ],
}
