import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { link } from '@/fields/link'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'תפריט עליון',
  access: { read: anyone, update: authenticated },
  admin: { group: 'הגדרות' },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'פריטי תפריט',
      maxRows: 8,
      labels: { singular: 'פריט', plural: 'פריטים' },
      fields: [
        link({ appearances: false }),
        {
          name: 'children',
          type: 'array',
          label: 'תת־תפריט',
          labels: { singular: 'פריט', plural: 'פריטים' },
          fields: [link({ appearances: false })],
        },
      ],
    },
    {
      ...link({ name: 'cta', label: 'כפתור CTA', appearances: false, required: false }),
      admin: { description: 'הכפתור הבולט בצד התפריט, למשל "בואו נדבר"' },
    },
  ],
  hooks: { afterChange: [revalidateGlobal] },
}
