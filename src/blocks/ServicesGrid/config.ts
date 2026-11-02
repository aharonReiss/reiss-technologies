import type { Block } from 'payload'

import { anchorField, backgroundField, sectionHeader } from '../shared'

export const ServicesGridBlock: Block = {
  slug: 'servicesGrid',
  interfaceName: 'ServicesGridBlock',
  labels: { singular: 'רשת שירותים', plural: 'רשת שירותים' },
  fields: [
    ...sectionHeader,
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'שירותים להצגה',
      admin: { description: 'השאר ריק כדי להציג את כל השירותים לפי הסדר שנקבע' },
    },
    backgroundField,
    anchorField,
  ],
}
