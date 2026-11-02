import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '@/access'
import { publishedAtField } from '@/fields/publishedAt'
import { seoTab } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { revalidateHooks } from '@/hooks/revalidate'
import { previewFor } from '@/utilities/preview'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'מאמר', plural: 'מאמרים' },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: 'בלוג',
    useAsTitle: 'title',
    defaultColumns: ['title', 'categories', 'publishedAt', '_status'],
    ...previewFor('posts'),
  },
  defaultSort: '-publishedAt',
  defaultPopulate: {
    title: true,
    slug: true,
    excerpt: true,
    heroImage: true,
    categories: true,
    publishedAt: true,
  },
  fields: [
    { name: 'title', type: 'text', label: 'כותרת', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'תוכן',
          fields: [
            { name: 'excerpt', type: 'textarea', label: 'תקציר' },
            { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'תמונה ראשית' },
            { name: 'content', type: 'richText', label: 'תוכן', required: true },
          ],
        },
        {
          label: 'קשור',
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              relationTo: 'posts',
              hasMany: true,
              label: 'מאמרים קשורים',
              filterOptions: ({ id }) => ({ id: { not_in: [id] } }),
            },
          ],
        },
        seoTab,
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'קטגוריות',
      admin: { position: 'sidebar' },
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      label: 'כותבים',
      admin: { position: 'sidebar' },
    },
    publishedAtField,
    slugField(),
  ],
  hooks: revalidateHooks,
  versions: {
    drafts: { autosave: { interval: 1000 }, schedulePublish: true },
    maxPerDoc: 30,
  },
}
