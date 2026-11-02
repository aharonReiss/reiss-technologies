import type { Block } from 'payload'

import { anchorField, backgroundField, sectionHeader } from '../shared'

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  interfaceName: 'ContactFormBlock',
  labels: { singular: 'טופס יצירת קשר', plural: 'טופס יצירת קשר' },
  fields: [
    ...sectionHeader,
    {
      name: 'showContactDetails',
      type: 'checkbox',
      label: 'הצג פרטי קשר לצד הטופס',
      defaultValue: true,
      admin: { description: 'הפרטים נלקחים מהגדרות האתר' },
    },
    {
      name: 'serviceOptions',
      type: 'checkbox',
      label: 'הצג שדה "במה מדובר" עם רשימת השירותים',
      defaultValue: true,
    },
    {
      name: 'submitLabel',
      type: 'text',
      label: 'טקסט כפתור השליחה',
      defaultValue: 'שלחו ונחזור אליכם',
    },
    {
      name: 'successMessage',
      type: 'textarea',
      label: 'הודעה אחרי שליחה',
      defaultValue: 'תודה! קיבלנו את הפרטים ונחזור אליכם בהקדם.',
    },
    backgroundField,
    { ...anchorField, defaultValue: 'contact' } as typeof anchorField,
  ],
}
