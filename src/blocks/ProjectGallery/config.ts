import type { Block } from 'payload'

import { anchorField } from '../shared'

export const ProjectGalleryBlock: Block = {
  slug: 'projectGallery',
  interfaceName: 'ProjectGalleryBlock',
  labels: { singular: 'גלריית פרויקטים (גלילה אופקית)', plural: 'גלריית פרויקטים (גלילה אופקית)' },
  admin: { disableBlockName: true },
  fields: [
    { name: 'heading', type: 'text', label: 'כותרת (H1)', defaultValue: 'הפרויקטים שלנו.', required: true },
    {
      name: 'intro',
      type: 'textarea',
      label: 'פסקה',
      admin: {
        description:
          'מתחת לפסקה מוצגים כל הפרויקטים שפורסמו, לפי הסדר ברשימת הפרויקטים, עם "תמונה לעמוד הפרויקטים" של כל פרויקט.',
      },
    },
    anchorField,
  ],
}
