import type { ArrayField, Field, GroupField } from 'payload'

import { linkableCollections } from '@/utilities/routes'

export type LinkAppearance = 'primary' | 'secondary' | 'link'

const appearanceOptions: { label: string; value: LinkAppearance }[] = [
  { label: 'כפתור ראשי', value: 'primary' },
  { label: 'כפתור משני', value: 'secondary' },
  { label: 'קישור טקסט', value: 'link' },
]

type LinkArgs = {
  name?: string
  label?: string
  appearances?: false | LinkAppearance[]
  disableLabel?: boolean
  required?: boolean
}

/**
 * A link that points either to an internal document (chosen from a list,
 * so URLs never break when slugs change) or to any external URL.
 */
export const link = ({
  name = 'link',
  label = 'קישור',
  appearances,
  disableLabel = false,
  required = true,
}: LinkArgs = {}): GroupField => {
  const fields: Field[] = [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'radio',
          label: 'סוג קישור',
          defaultValue: 'reference',
          options: [
            { label: 'עמוד באתר', value: 'reference' },
            { label: 'כתובת חיצונית / מותאמת', value: 'custom' },
          ],
          admin: { layout: 'horizontal', width: '50%' },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'פתח בלשונית חדשה',
          admin: { width: '50%', style: { alignSelf: 'flex-end' } },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'reference',
          type: 'relationship',
          label: 'עמוד',
          relationTo: linkableCollections,
          required,
          maxDepth: 1,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'reference',
            width: disableLabel ? '100%' : '50%',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'כתובת',
          required,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'custom',
            description: 'למשל https://… , /contact , #faq , tel:… , mailto:…',
            width: disableLabel ? '100%' : '50%',
          },
        },
        ...(disableLabel
          ? []
          : [
              {
                name: 'label',
                type: 'text',
                label: 'טקסט הקישור',
                required,
                admin: { width: '50%' },
              } satisfies Field,
            ]),
      ],
    },
  ]

  if (appearances !== false) {
    fields.push({
      name: 'appearance',
      type: 'select',
      label: 'תצוגה',
      defaultValue: appearances?.[0] ?? 'primary',
      options: appearances
        ? appearanceOptions.filter((o) => appearances.includes(o.value))
        : appearanceOptions,
    })
  }

  return {
    name,
    label,
    type: 'group',
    admin: { hideGutter: true },
    fields,
  }
}

export const linkGroup = ({
  name = 'links',
  label = 'כפתורים',
  maxRows = 2,
  appearances,
}: {
  name?: string
  label?: string
  maxRows?: number
  appearances?: LinkAppearance[]
} = {}): ArrayField => ({
  name,
  label,
  type: 'array',
  maxRows,
  labels: { singular: 'קישור', plural: 'קישורים' },
  fields: [link({ appearances })],
})
