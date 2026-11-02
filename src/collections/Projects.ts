import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '@/access'
import { layoutBlocks, offeredBlocks } from '@/blocks'
import { seoTab } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { revalidateHooks } from '@/hooks/revalidate'
import { previewFor } from '@/utilities/preview'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'פרויקט', plural: 'פרויקטים' },
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
    defaultColumns: ['title', 'client', 'featured', '_status'],
    ...previewFor('projects'),
  },
  defaultPopulate: {
    title: true,
    slug: true,
    client: true,
    excerpt: true,
    coverImage: true,
    tags: true,
    // The home page rail: the client's need, our solution and the client's own words.
    need: true,
    answer: true,
    testimonial: true,
    websiteUrl: true,
    desktopScreenshot: true,
    mobileScreenshot: true,
  },
  fields: [
    { name: 'title', type: 'text', label: 'שם הפרויקט', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'כרטיס',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'client', type: 'text', label: 'לקוח' },
                { name: 'year', type: 'number', label: 'שנה' },
              ],
            },
            { name: 'excerpt', type: 'textarea', label: 'תיאור קצר', required: true },
            {
              name: 'need',
              type: 'textarea',
              label: 'הצורך של הלקוח (משפט אחד)',
              admin: { description: 'מוצג בכרטיס הפרויקט בדף הבית. מה הלקוח היה צריך, בלי מספרים שלא נמדדו.' },
            },
            {
              name: 'answer',
              type: 'textarea',
              label: 'מה בנינו (משפט אחד)',
              admin: { description: 'מוצג בכרטיס לצד הצורך. אם יש לפרויקט המלצה אמיתית (בלשונית Case Study), היא מוצגת מתחתיו.' },
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              label: 'תמונה ראשית',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'galleryWide',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'תמונה לעמוד הפרויקטים: דסקטופ',
                  admin: { width: '50%', description: 'יחס 16:10, למשל 1440×900. ריק = התמונה הראשית' },
                },
                {
                  name: 'galleryTall',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'תמונה לעמוד הפרויקטים: מובייל',
                  admin: { width: '50%', description: 'יחס 4:5, למשל 780×975. ריק = התמונה הראשית' },
                },
              ],
            },
            {
              name: 'tags',
              type: 'text',
              hasMany: true,
              label: 'תגיות',
              admin: { description: 'למשל: חנות, וורדפרס, דף נחיתה' },
            },
          ],
        },
        {
          label: 'תצוגת מכשירים',
          description: 'צילומי מסך מהאתר החי, מוצגים בתוך מסגרת דפדפן וטלפון',
          fields: [
            {
              name: 'websiteUrl',
              type: 'text',
              label: 'קישור לאתר החי',
              admin: { description: 'מוצג בשורת הכתובת של הדפדפן' },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'desktopScreenshot',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'צילום דסקטופ',
                  admin: {
                    width: '50%',
                    description: 'רוחב 1440. צילום ארוך (full page) נגלל בתוך המסגרת במעבר עכבר',
                  },
                },
                {
                  name: 'mobileScreenshot',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'צילום מובייל',
                  admin: { width: '50%', description: '390×844 (או כפול לחדות)' },
                },
              ],
            },
          ],
        },
        {
          label: 'Case Study',
          description: 'כל אזור מוצג רק כשיש לו תוכן אמיתי',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'heroImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'תמונת פתיחה',
                  admin: { width: '50%', description: 'מסך אחד של האתר, 2880×1800. ברירת מחדל: צילום הדסקטופ' },
                },
                {
                  name: 'desktopScroll',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'צילום דסקטופ ארוך',
                  admin: { width: '50%', description: 'כמה מסכים ברצף, נגלל בתצוגת הדסקטופ. ברירת מחדל: צילום הדסקטופ' },
                },
              ],
            },
            {
              name: 'mobilePreview',
              type: 'upload',
              relationTo: 'media',
              label: 'צילום מובייל מלא',
              admin: {
                description: 'כל עמוד הבית במובייל, 390 ברוחב (פי 2). המבקרים גוללים בו בתוך הטלפון. ברירת מחדל: צילום המובייל',
              },
            },
            { name: 'mobileNote', type: 'textarea', label: 'מה מיוחד במובייל' },
            {
              name: 'details',
              type: 'array',
              label: 'פרטים שעושים את ההבדל',
              maxRows: 3,
              fields: [
                { name: 'title', type: 'text', label: 'כותרת', required: true },
                { name: 'text', type: 'textarea', label: 'הסבר', required: true },
                {
                  name: 'images',
                  type: 'upload',
                  relationTo: 'media',
                  hasMany: true,
                  maxRows: 2,
                  label: 'צילומים',
                  required: true,
                },
                {
                  name: 'kind',
                  type: 'select',
                  label: 'סוג צילום',
                  defaultValue: 'desktop',
                  options: [
                    { label: 'דסקטופ', value: 'desktop' },
                    { label: 'מובייל', value: 'mobile' },
                  ],
                },
              ],
            },
            {
              name: 'services',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              label: 'שירותים שניתנו',
            },
            { name: 'challenge', type: 'richText', label: 'האתגר' },
            { name: 'solution', type: 'richText', label: 'הפתרון' },
            {
              name: 'results',
              type: 'array',
              label: 'תוצאות במספרים',
              maxRows: 4,
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', type: 'text', label: 'ערך', required: true },
                    { name: 'label', type: 'text', label: 'תיאור', required: true },
                  ],
                },
              ],
            },
            {
              name: 'gallery',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              label: 'גלריה',
            },
            {
              name: 'testimonial',
              type: 'relationship',
              relationTo: 'testimonials',
              label: 'המלצה מהלקוח',
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
    {
      name: 'featured',
      type: 'checkbox',
      label: 'פרויקט מומלץ',
      admin: { position: 'sidebar', description: 'מוצג ברשתות "פרויקטים מומלצים"' },
    },
    slugField(),
  ],
  hooks: revalidateHooks,
  versions: { drafts: { autosave: { interval: 1000 } }, maxPerDoc: 20 },
}
