import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'משתמש', plural: 'משתמשים' },
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: { group: 'הגדרות', useAsTitle: 'name', defaultColumns: ['name', 'email'] },
  auth: true,
  fields: [{ name: 'name', type: 'text', label: 'שם' }],
}
