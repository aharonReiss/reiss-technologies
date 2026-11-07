import { randomBytes } from 'crypto'
import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access'
import { STATUS_LABELS, type ClientStatus } from '@/onboarding/types'
import { decrypt, encrypt, isEncrypted } from '@/utilities/secrets'

/** 32 random bytes, URL-safe: the client's whole key to their questionnaire. */
export const newToken = () => randomBytes(32).toString('base64url')

/**
 * Clients of the studio and their onboarding. Each gets a private questionnaire
 * link (/onboarding/<token>) on creation; answers and the copy of the
 * questionnaire they answered are kept here, files in `client-files`.
 * Admins only: nothing here is readable through the public API.
 */
export const ClientProfiles: CollectionConfig = {
  slug: 'client-profiles',
  labels: { singular: 'לקוח', plural: 'לקוחות' },
  access: { create: authenticated, read: authenticated, update: authenticated, delete: authenticated },
  admin: {
    group: 'ניהול לקוחות',
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'businessName', 'email', 'phone', 'status', 'createdAt', 'lastActivityAt', 'copyLink'],
    listSearchableFields: ['fullName', 'businessName', 'email', 'phone', 'projectName'],
    description: 'אחרי השמירה נוצר ללקוח קישור אישי לשאלון. מעתיקים אותו ושולחים בוואטסאפ או במייל.',
  },
  defaultSort: '-createdAt',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'פרטי לקוח',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'firstName', type: 'text', label: 'שם פרטי', required: true },
                { name: 'lastName', type: 'text', label: 'שם משפחה', required: true },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'email', type: 'email', label: 'אימייל', required: true },
                { name: 'phone', type: 'text', label: 'טלפון', required: true },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'businessName', type: 'text', label: 'שם העסק' },
                { name: 'projectName', type: 'text', label: 'שם הפרויקט' },
              ],
            },
            {
              name: 'notes',
              type: 'textarea',
              label: 'הערות פנימיות',
              admin: { description: 'גלוי רק לך באדמין. הלקוח לא רואה את זה.' },
            },
          ],
        },
        {
          label: 'גישות למערכות',
          description: 'הסיסמאות נשמרות מוצפנות (AES-256). גלוי רק לאדמין מחובר, לעולם לא ללקוח.',
          fields: [
            {
              name: 'credentials',
              type: 'array',
              label: 'מערכות',
              labels: { singular: 'מערכת', plural: 'מערכות' },
              admin: { components: { RowLabel: '@/components/admin/QuestionnaireRowLabel#CredentialRowLabel' } },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'system', type: 'text', label: 'שם המערכת', required: true, admin: { width: '50%', placeholder: 'למשל: אחסון, דומיין, וורדפרס' } },
                    { name: 'url', type: 'text', label: 'כתובת כניסה', admin: { width: '50%', rtl: false } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'username',
                      type: 'text',
                      label: 'משתמש',
                      admin: { width: '50%', components: { Field: '@/components/admin/SecretField#SecretField' } },
                    },
                    {
                      name: 'password',
                      type: 'text',
                      label: 'סיסמה',
                      admin: {
                        width: '50%',
                        components: { Field: { path: '@/components/admin/SecretField#SecretField', clientProps: { secret: true } } },
                      },
                      hooks: {
                        // Stored encrypted; an already-encrypted value (unchanged) is kept as is.
                        beforeChange: [({ value }) => (typeof value === 'string' && value && !isEncrypted(value) ? encrypt(value) : value)],
                        // Decrypted only for a logged-in admin. Server code without a user (the
                        // questionnaire saving a client's answers) gets the stored ciphertext, which
                        // it writes back unchanged; a request from outside without a user gets null.
                        afterRead: [
                          ({ value, req }) => {
                            if (!req.user) return req.payloadAPI === 'local' ? value : null
                            if (!isEncrypted(value)) return value
                            try {
                              return decrypt(value)
                            } catch {
                              return '⚠ לא ניתן לפענח (מפתח הצפנה שגוי)'
                            }
                          },
                        ],
                      },
                    },
                  ],
                },
                { name: 'notes', type: 'textarea', label: 'הערות', admin: { rows: 2 } },
              ],
            },
          ],
        },
        {
          label: 'תשובות וקבצים',
          fields: [
            {
              name: 'responses',
              type: 'ui',
              admin: { components: { Field: '@/components/admin/ClientResponses#ClientResponses' } },
            },
            {
              name: 'files',
              type: 'join',
              collection: 'client-files',
              on: 'client',
              label: 'כל הקבצים',
              admin: { defaultColumns: ['originalName', 'questionLabel', 'filesize', 'createdAt'] },
            },
          ],
        },
      ],
    },

    // Sidebar: the link, the status and the dates.
    {
      name: 'onboardingLink',
      type: 'ui',
      admin: { position: 'sidebar', components: { Field: '@/components/admin/OnboardingLink#OnboardingLink' } },
    },
    {
      name: 'status',
      type: 'select',
      label: 'סטטוס שאלון',
      defaultValue: 'not-started',
      required: true,
      options: (Object.keys(STATUS_LABELS) as ClientStatus[]).map((value) => ({ value, label: STATUS_LABELS[value] })),
      admin: {
        position: 'sidebar',
        description: 'מתעדכן לבד. להחזרה ל"בתהליך" אחרי שליחה, כדי שהלקוח יוכל לערוך שוב.',
      },
    },
    { name: 'lastActivityAt', type: 'date', label: 'פעילות אחרונה', admin: { position: 'sidebar', readOnly: true, date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'submittedAt', type: 'date', label: 'נשלח', admin: { position: 'sidebar', readOnly: true, date: { pickerAppearance: 'dayAndTime' } } },
    {
      name: 'linkActive',
      type: 'checkbox',
      label: 'הקישור פעיל',
      defaultValue: true,
      admin: { position: 'sidebar', description: 'כיבוי חוסם את הקישור בלי למחוק כלום' },
    },
    { name: 'archived', type: 'checkbox', label: 'בארכיון', defaultValue: false, index: true, admin: { position: 'sidebar' } },

    // List column with a copy button.
    {
      name: 'copyLink',
      type: 'ui',
      label: 'קישור',
      admin: { components: { Field: false, Cell: '@/components/admin/OnboardingLink#OnboardingLinkCell' } },
    },

    // Kept by the system, not edited by hand.
    { name: 'fullName', type: 'text', label: 'שם', index: true, admin: { hidden: true } },
    { name: 'token', type: 'text', unique: true, index: true, admin: { hidden: true } },
    { name: 'questionnaire', type: 'json', admin: { hidden: true } },
    { name: 'answers', type: 'json', admin: { hidden: true } },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data.token) data.token = newToken()
        if (data.firstName !== undefined || data.lastName !== undefined) {
          data.fullName = [data.firstName, data.lastName].filter(Boolean).join(' ').trim()
        }
        return data
      },
    ],
  },
  endpoints: [
    {
      // A new link; the old one stops working at once.
      path: '/:id/regenerate-token',
      method: 'post',
      handler: async (req) => {
        if (!req.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
        const id = req.routeParams?.id as string
        const doc = await req.payload.update({ collection: 'client-profiles', id, data: { token: newToken() }, req })
        return Response.json({ token: doc.token })
      },
    },
  ],
}
