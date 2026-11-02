import type { Block } from 'payload'

import { link } from '@/fields/link'
import { anchorField, backgroundField, sectionHeader } from '../shared'

export const ProjectsGridBlock: Block = {
  slug: 'projectsGrid',
  interfaceName: 'ProjectsGridBlock',
  labels: { singular: 'רשת פרויקטים', plural: 'רשת פרויקטים' },
  fields: [
    ...sectionHeader,
    {
      name: 'mode',
      type: 'select',
      label: 'אילו פרויקטים',
      defaultValue: 'featured',
      options: [
        { label: 'פרויקטים מומלצים', value: 'featured' },
        { label: 'כל הפרויקטים', value: 'all' },
        { label: 'בחירה ידנית', value: 'selected' },
      ],
    },
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      label: 'פרויקטים',
      admin: { condition: (_, s) => s?.mode === 'selected' },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'כמות מקסימלית',
      defaultValue: 6,
      admin: { condition: (_, s) => s?.mode !== 'selected' },
    },
    { name: 'showLink', type: 'checkbox', label: 'הצג כפתור בסוף האזור' },
    {
      ...link({ appearances: false, required: false }),
      admin: { condition: (_, s) => Boolean(s?.showLink) },
    },
    backgroundField,
    anchorField,
  ],
}
