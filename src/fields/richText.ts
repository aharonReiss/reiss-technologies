import {
  FixedToolbarFeature,
  HeadingFeature,
  LinkFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkableCollections } from '@/utilities/routes'

/** Rich text editor with internal links to any page/service/project/post. */
export const richTextEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures.filter((f) => f.key !== 'link' && f.key !== 'heading'),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    LinkFeature({
      enabledCollections: linkableCollections,
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'rel',
          type: 'select',
          label: 'Rel',
          hasMany: true,
          options: ['nofollow', 'noopener', 'noreferrer', 'sponsored'],
        },
      ],
    }),
    FixedToolbarFeature(),
  ],
})
