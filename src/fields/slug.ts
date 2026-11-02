import { slugField as payloadSlugField } from 'payload'
import type { RowField } from 'payload'

import { slugify } from '@/utilities/routes'

/** Slug in the sidebar, auto-generated from `title`, Hebrew-friendly. */
export const slugField = (useAsSlug = 'title'): RowField =>
  payloadSlugField({
    useAsSlug,
    position: 'sidebar',
    slugify: ({ valueToSlugify }) => slugify(valueToSlugify),
    overrides: (field) => {
      const [checkbox, slug] = field.fields as [any, any]
      if (checkbox) checkbox.label = 'צור כתובת אוטומטית מהכותרת'
      if (slug) {
        slug.label = 'כתובת (Slug)'
        slug.admin = {
          ...slug.admin,
          description: 'החלק בכתובת ה־URL. לדוגמה: about → /about',
        }
      }
      return field
    },
  })
