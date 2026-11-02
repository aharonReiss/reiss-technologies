import type { Block } from 'payload'

import { anchorField, backgroundField } from '../shared'

export const LogoCloudBlock: Block = {
  slug: 'logoCloud',
  interfaceName: 'LogoCloudBlock',
  labels: { singular: 'לוגואים של לקוחות', plural: 'לוגואים' },
  fields: [
    { name: 'heading', type: 'text', label: 'כותרת', defaultValue: 'לקוחות שבחרו בנו' },
    {
      name: 'clients',
      type: 'relationship',
      relationTo: 'clients',
      hasMany: true,
      label: 'לקוחות',
      admin: { description: 'השאר ריק כדי להציג את כל הלקוחות' },
    },
    backgroundField,
    anchorField,
  ],
}
