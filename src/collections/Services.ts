import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '@/access'
import { layoutBlocks, offeredBlocks } from '@/blocks'
import { iconField } from '@/fields/icon'
import { seoTab } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { revalidateHooks } from '@/hooks/revalidate'
import { previewFor } from '@/utilities/preview'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'שירות', plural: 'שירותים' },
  orderable: true,
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: 'תוכן',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status'],
    ...previewFor('services'),
  },
  defaultPopulate: { title: true, slug: true, excerpt: true, icon: true, image: true, pricing: true },
  fields: [
    { name: 'title', type: 'text', label: 'שם השירות', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'כרטיס',
          description: 'מה שמוצג ברשת השירותים',
          fields: [
            { name: 'excerpt', type: 'textarea', label: 'תיאור קצר', required: true },
            iconField(),
            { name: 'image', type: 'upload', relationTo: 'media', label: 'תמונה' },
          ],
        },
        {
          name: 'pricing',
          label: 'חבילה ומחיר',
          description: 'מוצג בבלוק "חבילות ומחירים" ובכרטיס השירות',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  type: 'number',
                  label: 'מחיר התחלתי (₪)',
                  min: 0,
                  admin: { width: '33%', description: 'ריק = "הצעת מחיר מותאמת"' },
                },
                {
                  name: 'showPrice',
                  type: 'checkbox',
                  label: 'להציג את המחיר באתר',
                  defaultValue: true,
                  admin: { width: '33%', description: 'כבוי או בלי מחיר = "מחיר בהתאם לפרויקט"' },
                },
                {
                  name: 'priceNote',
                  type: 'text',
                  label: 'הערת מחיר',
                  defaultValue: 'לפני מע״מ',
                  admin: { width: '33%' },
                },
                {
                  name: 'badge',
                  type: 'text',
                  label: 'תגית',
                  admin: { width: '33%', description: 'למשל: חבילת הליבה' },
                },
              ],
            },
            {
              name: 'purpose',
              type: 'textarea',
              label: 'למה זה נועד',
              admin: { description: 'משפט או שניים שמסבירים מה המוצר עושה בשביל העסק' },
            },
            {
              name: 'idealFor',
              type: 'text',
              label: 'מתאים ל… (שורה אחת)',
              admin: { description: 'מוצג כשאין רשימת תחומים' },
            },
            {
              name: 'niches',
              type: 'array',
              label: 'מתאים ל… (תחומים)',
              labels: { singular: 'תחום', plural: 'תחומים' },
              admin: { description: 'למשל: מכללות, קליניקות, משרדים' },
              fields: [{ name: 'text', type: 'text', required: true, label: 'תחום' }],
            },
            {
              name: 'process',
              type: 'array',
              label: 'מה התהליך כולל',
              labels: { singular: 'שלב', plural: 'שלבים' },
              fields: [{ name: 'text', type: 'text', required: true, label: 'שלב' }],
            },
            {
              name: 'included',
              type: 'array',
              label: 'מה כלול',
              labels: { singular: 'פריט', plural: 'פריטים' },
              fields: [{ name: 'text', type: 'text', required: true, label: 'פריט' }],
            },
            {
              name: 'highlighted',
              type: 'checkbox',
              label: 'הדגש כחבילה מומלצת',
            },
          ],
        },
        {
          name: 'menu',
          label: 'עמוד "מה אנחנו מציעים"',
          description: 'מה שנפתח מתחת לשורת השירות. המחיר נלקח מלשונית "חבילה ומחיר".',
          fields: [
            { name: 'heading', type: 'text', label: 'כותרת' },
            { name: 'text', type: 'textarea', label: 'תיאור' },
            {
              name: 'capabilities',
              type: 'array',
              label: 'יכולות לדוגמה',
              labels: { singular: 'יכולת', plural: 'יכולות' },
              admin: { description: 'דוגמאות למה שאפשר לבנות, לא רשימת מה כלול במחיר ההתחלתי' },
              fields: [{ name: 'text', type: 'text', required: true, label: 'יכולת' }],
            },
            {
              type: 'row',
              fields: [
                { name: 'ctaLabel', type: 'text', label: 'טקסט הכפתור', admin: { width: '50%' } },
                {
                  name: 'contactType',
                  type: 'text',
                  label: 'סוג הפרויקט בטופס יצירת הקשר',
                  admin: {
                    width: '50%',
                    description: 'בדיוק כמו אחת האפשרויות בטופס, למשל: אתר תדמית. נבחר מראש כשעוברים מכאן לטופס',
                  },
                },
              ],
            },
            {
              name: 'exampleProject',
              type: 'relationship',
              relationTo: 'projects',
              label: 'פרויקט לדוגמה',
              admin: { description: 'קישור לפרויקט אמיתי מהסוג הזה. ריק = בלי קישור' },
            },
          ],
        },
        {
          label: 'עמוד השירות',
          fields: [
            { name: 'content', type: 'richText', label: 'תוכן' },
            {
              name: 'features',
              type: 'array',
              label: 'מה כלול',
              labels: { singular: 'פריט', plural: 'פריטים' },
              fields: [
                { name: 'title', type: 'text', label: 'כותרת', required: true },
                { name: 'description', type: 'textarea', label: 'תיאור' },
              ],
            },
            {
              name: 'layout',
              type: 'blocks',
              label: 'אזורים נוספים בעמוד',
              blocks: layoutBlocks,
              filterOptions: offeredBlocks,
              labels: { singular: 'אזור', plural: 'אזורים' },
            },
          ],
        },
        seoTab,
      ],
    },
    slugField(),
  ],
  hooks: revalidateHooks,
  versions: { drafts: { autosave: { interval: 1000 } }, maxPerDoc: 20 },
}
