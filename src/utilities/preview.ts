import type { CollectionConfig } from 'payload'

import { docPath, getServerURL } from './routes'

/** Admin "Preview" button and live preview pointing at the document's public URL. */
export const previewFor = (collection: string): NonNullable<CollectionConfig['admin']> => ({
  preview: (doc) => `${getServerURL()}${docPath(collection, doc?.slug as string)}`,
  livePreview: {
    url: ({ data }) => `${getServerURL()}${docPath(collection, data?.slug as string)}`,
  },
})
