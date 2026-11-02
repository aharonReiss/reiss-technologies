import type { Block } from 'payload'

import { anchorField } from '../shared'

const media = (name: string, label: string, description?: string) => ({
  name,
  type: 'upload' as const,
  relationTo: 'media' as const,
  label,
  admin: description ? { description } : undefined,
})

export const ProjectStoriesBlock: Block = {
  slug: 'projectStories',
  interfaceName: 'ProjectStoriesBlock',
  labels: { singular: 'מאחורי העבודה (סיפורי פרויקטים)', plural: 'מאחורי העבודה (סיפורי פרויקטים)' },
  admin: { disableBlockName: true },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'כותרת קטנה', defaultValue: 'BEHIND THE WORK' },
    {
      name: 'heading',
      type: 'text',
      label: 'כותרת',
      required: true,
      admin: { description: 'הקיפו את השורה השנייה בכוכביות כדי לצבוע אותה בכחול, למשל: לא רק איך זה נראה. *גם למה זה עובד.*' },
    },
    { name: 'intro', type: 'textarea', label: 'פסקה' },
    {
      name: 'stories',
      type: 'array',
      label: 'פרויקטים',
      maxRows: 4,
      fields: [
        { name: 'project', type: 'relationship', relationTo: 'projects', required: true, label: 'פרויקט' },
        { name: 'label', type: 'text', label: 'שם קצר (ליד המספר)', admin: { description: 'למשל SEA VIEW' } },
        { name: 'headline', type: 'text', label: 'כותרת', required: true },
        { name: 'text', type: 'textarea', label: 'האתגר וההחלטה', required: true },
        {
          name: 'layout',
          type: 'select',
          label: 'הדגמה',
          defaultValue: 'browser',
          options: [
            { label: 'מסך מחשב גדול וטלפון לצידו', value: 'browser' },
            { label: 'שני טלפונים (כשהמובייל מספר את הסיפור)', value: 'phones' },
          ],
        },
        {
          type: 'row',
          fields: [
            media('desktop', 'מסך מחשב: וידאו או תמונה', 'וידאו MP4 קצר ושקט (5-8 שניות) או צילום מסך ביחס 16:10'),
            media('desktopPoster', 'תמונת פתיחה לווידאו של המחשב'),
          ],
        },
        {
          type: 'row',
          fields: [
            media('phone', 'טלפון: וידאו או תמונה', 'מוצג גם במובייל, כהדגמה היחידה'),
            media('phonePoster', 'תמונת פתיחה לווידאו של הטלפון'),
          ],
        },
        media('phone2', 'טלפון שני (בתצוגת שני טלפונים)'),
        { name: 'linkLabel', type: 'text', label: 'טקסט הקישור', defaultValue: 'לסיפור הפרויקט המלא' },
      ],
    },
    anchorField,
  ],
}
