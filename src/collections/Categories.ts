import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { slugField } from '@/fields/slug'
import { revalidateHooks } from '@/hooks/revalidate'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'קטגוריה', plural: 'קטגוריות' },
  access: { create: authenticated, read: anyone, update: authenticated, delete: authenticated },
  admin: { group: 'בלוג', useAsTitle: 'title' },
  fields: [{ name: 'title', type: 'text', label: 'שם', required: true }, slugField()],
  hooks: revalidateHooks,
}
