import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access'
import { RESERVED_SLUGS, SHORT_LINK_SLUG } from '@/utilities/shortLinks'

/**
 * Short links (reiss-dgtl.com/ig → a destination). The redirect itself runs in
 * src/proxy.ts, straight against this table, so a change takes effect at once.
 * Admin only: the public never reads this collection.
 */
export const ShortLinks: CollectionConfig = {
  slug: 'short-links',
  labels: { singular: 'קישור קצר', plural: 'קישורים קצרים' },
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: 'הגדרות',
    useAsTitle: 'slug',
    defaultColumns: ['slug', 'destination', 'active', 'clicks', 'note'],
    description: 'כתובת קצרה באתר שמעבירה מיד ליעד, למשל reiss-dgtl.com/ig. שינוי יעד נכנס לתוקף מיד.',
  },
  defaultSort: 'slug',
  fields: [
    {
      name: 'slug',
      type: 'text',
      label: 'כתובת קצרה',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'אותיות באנגלית קטנות, ספרות ומקפים. למשל ig יוצר את reiss-dgtl.com/ig' },
      hooks: {
        beforeValidate: [({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value)],
      },
      validate: async (value: string | null | undefined, { req, id }: { req: any; id?: string | number }) => {
        if (!value) return 'חובה למלא כתובת קצרה'
        if (!SHORT_LINK_SLUG.test(value)) return 'רק אותיות באנגלית קטנות, ספרות ומקפים (לא בהתחלה או בסוף)'
        if (RESERVED_SLUGS.has(value)) return `הכתובת /${value} כבר תפוסה באתר`
        // A page with the same address would be hidden behind the short link.
        const pages = await req.payload.find({
          collection: 'pages',
          where: { slug: { equals: value } },
          limit: 1,
          depth: 0,
          draft: true,
          req,
        })
        if (pages.totalDocs > 0) return `יש באתר עמוד בכתובת /${value}`
        return true
      },
    },
    {
      name: 'destination',
      type: 'text',
      label: 'כתובת יעד',
      required: true,
      admin: { description: 'כתובת מלאה (https://…) או נתיב באתר שמתחיל ב-/ , למשל /?utm_source=instagram' },
      validate: (value: string | null | undefined) => {
        if (!value) return 'חובה למלא כתובת יעד'
        if (value.startsWith('/') && !value.startsWith('//')) return true
        try {
          const url = new URL(value)
          return url.protocol === 'https:' || url.protocol === 'http:' ? true : 'הכתובת צריכה להתחיל ב-https://'
        } catch {
          return 'כתובת לא תקינה: כתובת מלאה (https://…) או נתיב שמתחיל ב-/'
        }
      },
    },
    { name: 'active', type: 'checkbox', label: 'פעיל', defaultValue: true },
    { name: 'note', type: 'textarea', label: 'הערה' },
    {
      name: 'clicks',
      type: 'number',
      label: 'כניסות',
      defaultValue: 0,
      access: { create: () => false, update: () => false },
      admin: { readOnly: true, position: 'sidebar' },
    },
  ],
}
