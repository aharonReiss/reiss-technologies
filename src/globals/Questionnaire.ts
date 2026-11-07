import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access'
import { QUESTION_TYPES } from '@/onboarding/types'

const withOptions = ['radio', 'checkbox', 'select']
const withFiles = ['file', 'image']

/**
 * The one onboarding questionnaire every client answers. Edited as a draft and
 * published; a client gets the published version when they start, and keeps that
 * copy (see ClientProfiles), so later edits never touch answers already given.
 */
export const Questionnaire: GlobalConfig = {
  slug: 'questionnaire',
  label: 'שאלון לקוחות',
  access: { read: authenticated, update: authenticated, readVersions: authenticated },
  admin: {
    group: 'ניהול לקוחות',
    description: 'שאלון אחד לכל הלקוחות. שינויים נשמרים כטיוטה ונכנסים לתוקף רק אחרי "פרסום", ללקוחות שעדיין לא התחילו.',
    preview: () => '/onboarding/preview',
  },
  versions: { drafts: true, max: 50 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'שאלות',
          fields: [
            {
              name: 'sections',
              type: 'array',
              label: 'שלבים',
              labels: { singular: 'שלב', plural: 'שלבים' },
              minRows: 1,
              admin: {
                description: 'כל שלב מוצג ללקוח כעמוד נפרד. גוררים כדי לשנות סדר.',
                components: { RowLabel: '@/components/admin/QuestionnaireRowLabel#SectionRowLabel' },
              },
              fields: [
                { name: 'title', type: 'text', label: 'כותרת השלב', required: true },
                { name: 'description', type: 'textarea', label: 'תיאור קצר' },
                {
                  name: 'questions',
                  type: 'array',
                  label: 'שאלות',
                  labels: { singular: 'שאלה', plural: 'שאלות' },
                  minRows: 1,
                  admin: { components: { RowLabel: '@/components/admin/QuestionnaireRowLabel#QuestionRowLabel' } },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'label', type: 'text', label: 'השאלה', required: true, admin: { width: '60%' } },
                        {
                          name: 'type',
                          type: 'select',
                          label: 'סוג תשובה',
                          required: true,
                          defaultValue: 'text',
                          options: QUESTION_TYPES.map((t) => ({ label: t.label, value: t.value })),
                          admin: { width: '25%' },
                        },
                        {
                          name: 'required',
                          type: 'checkbox',
                          label: 'חובה',
                          admin: { width: '15%', style: { alignSelf: 'flex-end' } },
                        },
                      ],
                    },
                    { name: 'help', type: 'text', label: 'הסבר מתחת לשאלה' },
                    {
                      name: 'placeholder',
                      type: 'text',
                      label: 'טקסט לדוגמה בתוך השדה',
                      admin: { condition: (_, s) => ['text', 'textarea', 'url'].includes(s?.type) },
                    },
                    {
                      name: 'options',
                      type: 'array',
                      label: 'אפשרויות',
                      labels: { singular: 'אפשרות', plural: 'אפשרויות' },
                      admin: { condition: (_, s) => withOptions.includes(s?.type) },
                      validate: (value: unknown, { siblingData }: { siblingData: { type?: string } }) =>
                        !withOptions.includes(siblingData?.type ?? '') || (Array.isArray(value) && value.length >= 2)
                          ? true
                          : 'צריך לפחות שתי אפשרויות',
                      fields: [{ name: 'label', type: 'text', label: 'אפשרות', required: true }],
                    },
                    {
                      name: 'multiple',
                      type: 'checkbox',
                      label: 'לאפשר כמה קבצים',
                      defaultValue: true,
                      admin: { condition: (_, s) => withFiles.includes(s?.type) },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'פתיחה וסיום',
          fields: [
            {
              name: 'intro',
              type: 'textarea',
              label: 'הודעת פתיחה',
              admin: { description: 'מוצגת מתחת ל"היי {שם פרטי}". אפשר לכתוב כמה שורות.' },
            },
            { name: 'closingTitle', type: 'text', label: 'כותרת אחרי שליחה', defaultValue: 'תודה, קיבלנו הכול' },
            { name: 'closingText', type: 'textarea', label: 'הודעה אחרי שליחה' },
          ],
        },
        {
          label: 'קבצים',
          fields: [
            {
              name: 'maxFileSizeMB',
              type: 'number',
              label: 'גודל מקסימלי לקובץ (MB)',
              defaultValue: 25,
              min: 1,
              max: 200,
              required: true,
              admin: { description: 'אם מגדילים מעל 50, צריך להגדיל גם את client_max_body_size ב־Nginx בשרת' },
            },
          ],
        },
      ],
    },
  ],
}
