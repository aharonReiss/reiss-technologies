import type { Block } from 'payload'

import { linkGroup } from '@/fields/link'
import { signatureFields } from '../shared'

const isPersonal = (_: unknown, s: { variant?: string }) => s?.variant === 'personal'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero (פתיח)', plural: 'Hero' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'סגנון',
      defaultValue: 'page',
      options: [
        { label: 'דף הבית (גדול)', value: 'home' },
        { label: 'אישי (עם תמונה וחתימה)', value: 'personal' },
        { label: 'עמוד פנימי', value: 'page' },
      ],
    },
    { name: 'eyebrow', type: 'text', label: 'כותרת עליונה קטנה' },
    {
      name: 'heading',
      type: 'textarea',
      label: 'כותרת',
      required: true,
      admin: { description: 'כדי להדגיש מילים בצבע המותג, עטוף אותן בכוכביות: *אתרים שמוכרים*' },
    },
    { name: 'subheading', type: 'textarea', label: 'תת־כותרת' },
    // Two buttons; on the home hero further links show as a row of quiet links.
    linkGroup({ maxRows: 4 }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'תמונה (אופציונלי)',
      admin: { condition: (_, s) => !isPersonal(_, s) },
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      label: 'תמונה אישית (רקע שקוף)',
      admin: {
        condition: isPersonal,
        description:
          'PNG עם רקע שקוף, חתוך עד המותניים. בלי תמונה, הכותרת מוצגת במרכז ברוחב מלא',
      },
    },
    {
      name: 'growWord',
      type: 'text',
      label: 'מילה צומחת',
      admin: {
        condition: (d, s) => isPersonal(d, s) && !(s as { portrait?: unknown })?.portrait,
        description:
          'מילה אחת מתוך הכותרת שתוצג בענק ו"תצמח" בכניסה (למשל: צומח). מה שלפניה מוצג מעליה, ומה שאחריה בכחול לצידה',
      },
    },
    { ...signatureFields, admin: { condition: isPersonal } },
    {
      name: 'bubbles',
      type: 'array',
      label: 'בועות סביב התמונה',
      maxRows: 3,
      labels: { singular: 'בועה', plural: 'בועות' },
      admin: {
        condition: (d, s) => isPersonal(d, s) && Boolean((s as { portrait?: unknown })?.portrait),
        description: 'משפט קצר בכל בועה. **כוכביות כפולות** מדגישות מילים',
      },
      fields: [{ name: 'text', type: 'text', required: true, label: 'טקסט' }],
    },
    {
      name: 'floatingTestimonial',
      type: 'relationship',
      relationTo: 'testimonials',
      label: 'המלצה צפה על התמונה',
      admin: { condition: isPersonal },
    },
    {
      name: 'proof',
      type: 'group',
      label: 'מספר בולט',
      admin: { condition: isPersonal, hideGutter: true },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', label: 'ערך (למשל 120+)' },
            { name: 'label', type: 'text', label: 'תיאור' },
          ],
        },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'נקודות מתחת לכפתורים',
      maxRows: 4,
      admin: { condition: (_, s) => s?.variant === 'home' },
      fields: [{ name: 'text', type: 'text', required: true, label: 'טקסט' }],
    },
  ],
}
