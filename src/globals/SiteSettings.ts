import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { revalidateGlobal } from '@/hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'הגדרות האתר',
  access: { read: anyone, update: authenticated },
  admin: { group: 'הגדרות' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'מיתוג',
          fields: [
            { name: 'siteName', type: 'text', label: 'שם האתר', defaultValue: 'REISS DIGITAL' },
            { name: 'tagline', type: 'text', label: 'סלוגן' },
            {
              type: 'row',
              fields: [
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'לוגו לרקע בהיר',
                  admin: {
                    width: '50%',
                    description: 'כהה (Deep Navy). מומלץ SVG שקוף. ריק = לוגו REISS DIGITAL המובנה',
                  },
                },
                {
                  name: 'logoLight',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'לוגו לרקע כהה',
                  admin: {
                    width: '50%',
                    description:
                      'בהיר (לבן). משמש בתפריט העליון ובפוטר. מומלץ SVG שקוף. ריק = לוגו REISS DIGITAL המובנה',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'contact',
          label: 'פרטי קשר',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'phone', type: 'text', label: 'טלפון' },
                { name: 'email', type: 'email', label: 'אימייל' },
              ],
            },
            {
              name: 'whatsapp',
              type: 'text',
              label: 'מספר WhatsApp',
              admin: {
                description:
                  'בפורמט בינלאומי, ספרות בלבד: 972501234567. משמש את כפתור הוואטסאפ הצף ואת טופס יצירת הקשר. ריק = הכפתור מוסתר',
              },
            },
            {
              name: 'whatsappMessage',
              type: 'text',
              label: 'הודעת פתיחה ב־WhatsApp',
              defaultValue: 'היי, אשמח לשמוע פרטים על בניית אתר',
            },
            { name: 'address', type: 'text', label: 'כתובת' },
            { name: 'hours', type: 'text', label: 'שעות פעילות' },
            {
              name: 'social',
              type: 'array',
              label: 'רשתות חברתיות',
              labels: { singular: 'רשת', plural: 'רשתות' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      label: 'רשת',
                      required: true,
                      options: [
                        { label: 'Facebook', value: 'facebook' },
                        { label: 'Instagram', value: 'instagram' },
                        { label: 'LinkedIn', value: 'linkedin' },
                        { label: 'TikTok', value: 'tiktok' },
                        { label: 'YouTube', value: 'youtube' },
                        { label: 'X', value: 'x' },
                      ],
                    },
                    { name: 'url', type: 'text', label: 'קישור', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'seo',
          label: 'SEO ברירת מחדל',
          fields: [
            {
              name: 'titleTemplate',
              type: 'text',
              label: 'תבנית כותרת',
              defaultValue: '%s | REISS DIGITAL',
              admin: { description: '%s מוחלף בכותרת העמוד' },
            },
            { name: 'defaultDescription', type: 'textarea', label: 'תיאור ברירת מחדל' },
            {
              name: 'defaultImage',
              type: 'upload',
              relationTo: 'media',
              label: 'תמונת שיתוף ברירת מחדל (1200×630)',
            },
            {
              name: 'organizationType',
              type: 'select',
              label: 'סוג העסק (JSON-LD)',
              defaultValue: 'ProfessionalService',
              options: [
                { label: 'ProfessionalService', value: 'ProfessionalService' },
                { label: 'Organization', value: 'Organization' },
                { label: 'LocalBusiness', value: 'LocalBusiness' },
              ],
            },
          ],
        },
        {
          name: 'integrations',
          label: 'אינטגרציות',
          fields: [
            {
              name: 'ga4Id',
              type: 'text',
              label: 'Google Analytics 4 Measurement ID',
              admin: { description: 'G-XXXXXXXXXX. ריק = Analytics לא נטען' },
            },
            {
              name: 'gscVerification',
              type: 'text',
              label: 'אימות Google Search Console',
              admin: { description: 'רק הקוד מתוך תגית ה־meta (content="..."), בלי התגית עצמה' },
            },
            {
              name: 'accessibility',
              type: 'group',
              label: 'ווידג׳ט נגישות (פשוט נגישות)',
              fields: [
                { name: 'enabled', type: 'checkbox', label: 'להציג את כפתור הנגישות', defaultValue: true },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'position',
                      type: 'select',
                      label: 'צד',
                      defaultValue: 'left',
                      options: [
                        { label: 'שמאל', value: 'left' },
                        { label: 'ימין', value: 'right' },
                      ],
                      admin: { width: '50%', description: 'כפתור הוואטסאפ נמצא בצד ימין' },
                    },
                    {
                      name: 'email',
                      type: 'email',
                      label: 'אימייל לפניות נגישות',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'statementUrl',
                  type: 'text',
                  label: 'קישור להצהרת הנגישות',
                  admin: { description: 'למשל /accessibility. ריק = בלי קישור להצהרה' },
                },
              ],
            },
            {
              name: 'leadNotificationEmails',
              type: 'array',
              dbName: 'lead_emails',
              label: 'כתובות לקבלת התראה על ליד חדש',
              labels: { singular: 'כתובת', plural: 'כתובות' },
              fields: [{ name: 'email', type: 'email', label: 'אימייל', required: true }],
            },
          ],
        },
      ],
    },
  ],
  hooks: { afterChange: [revalidateGlobal] },
}
