import type { Block } from 'payload'

import { linkGroup } from '@/fields/link'
import { anchorField, backgroundField } from '../shared'

export const CTABlock: Block = {
  slug: 'cta',
  interfaceName: 'CTABlock',
  labels: { singular: 'קריאה לפעולה', plural: 'קריאה לפעולה' },
  fields: [
    { name: 'heading', type: 'text', label: 'כותרת', required: true },
    { name: 'text', type: 'textarea', label: 'טקסט' },
    linkGroup(),
    {
      ...backgroundField,
      defaultValue: 'dark',
      options: [
        ...(backgroundField as { options: { label: string; value: string }[] }).options,
        { label: 'כחול חשמלי, לרוחב כל המסך (סיום העמוד)', value: 'brand' },
      ],
    } as typeof backgroundField,
    anchorField,
  ],
}
