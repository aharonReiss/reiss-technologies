import type { Field, RowField } from 'payload'

/** Common heading fields for section blocks. */
export const sectionHeader: Field[] = [
  {
    type: 'row',
    fields: [
      { name: 'eyebrow', type: 'text', label: 'כותרת עליונה קטנה', admin: { width: '35%' } },
      { name: 'heading', type: 'text', label: 'כותרת', admin: { width: '65%' } },
    ],
  },
  { name: 'intro', type: 'textarea', label: 'טקסט פתיחה' },
]

/** Handwritten signature: an uploaded scan wins over the script-font text. */
export const signatureFields: RowField = {
  type: 'row',
  fields: [
    {
      name: 'signatureText',
      type: 'text',
      label: 'חתימה (טקסט בכתב יד)',
      admin: { width: '50%', description: 'מוצג בגופן כתב יד עברי, למשל: אהרן רייס' },
    },
    {
      name: 'signatureImage',
      type: 'upload',
      relationTo: 'media',
      label: 'או: צילום חתימה אמיתית',
      admin: { width: '50%', description: 'PNG שקוף או SVG. אם הועלה, מוצג במקום הטקסט' },
    },
  ],
}

export const anchorField: Field = {
  name: 'anchor',
  type: 'text',
  label: 'עוגן (id)',
  admin: { description: 'לקישור ישיר לאזור בעמוד, למשל faq → /#faq' },
}

export const backgroundField: Field = {
  name: 'background',
  type: 'select',
  label: 'רקע',
  defaultValue: 'light',
  options: [
    { label: 'בהיר', value: 'light' },
    { label: 'אפור עדין', value: 'muted' },
    { label: 'כהה', value: 'dark' },
  ],
}
