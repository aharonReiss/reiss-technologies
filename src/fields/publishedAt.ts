import type { Field } from 'payload'

export const publishedAtField: Field = {
  name: 'publishedAt',
  type: 'date',
  label: 'תאריך פרסום',
  admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
  hooks: {
    beforeChange: [
      ({ siblingData, value }) => {
        if (siblingData._status === 'published' && !value) return new Date()
        return value
      },
    ],
  },
}
