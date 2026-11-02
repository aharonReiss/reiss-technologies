import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '@/access'
import { layoutBlocks, offeredBlocks } from '@/blocks'
import { publishedAtField } from '@/fields/publishedAt'
import { seoTab } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { revalidateHooks } from '@/hooks/revalidate'
import { previewFor } from '@/utilities/preview'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'עמוד', plural: 'עמודים' },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: 'תוכן',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description: 'העמוד עם הכתובת home הוא דף הבית',
    ...previewFor('pages'),
  },
  defaultPopulate: { title: true, slug: true },
  fields: [
    { name: 'title', type: 'text', label: 'כותרת', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'תוכן',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: 'אזורים בעמוד',
              blocks: layoutBlocks,
              filterOptions: offeredBlocks,
              labels: { singular: 'אזור', plural: 'אזורים' },
            },
          ],
        },
        seoTab,
      ],
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
