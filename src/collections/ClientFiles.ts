import path from 'path'
import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access'

/**
 * Files a client uploads through their questionnaire link. Kept on disk outside
 * the public folder (CLIENT_FILES_DIR, default ./private/client-files), never in
 * PostgreSQL, and served only to logged-in admins (Payload checks `read` access
 * on every file request) or to the same client through their token
 * (src/app/(onboarding)/onboarding/[token]/file).
 */
export const ClientFiles: CollectionConfig = {
  slug: 'client-files',
  labels: { singular: 'קובץ לקוח', plural: 'קבצי לקוחות' },
  access: {
    // Created only server-side by the upload route (Local API).
    create: () => false,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: 'ניהול לקוחות',
    useAsTitle: 'originalName',
    defaultColumns: ['originalName', 'client', 'questionLabel', 'filesize', 'createdAt'],
  },
  defaultSort: '-createdAt',
  upload: {
    staticDir: path.resolve(process.cwd(), process.env.CLIENT_FILES_DIR || 'private/client-files'),
    adminThumbnail: 'thumbnail',
    imageSizes: [{ name: 'thumbnail', width: 400, height: 400, fit: 'inside', withoutEnlargement: true }],
    // The upload route checks the type against the question; this keeps the admin in line too.
    mimeTypes: [
      'image/*',
      'application/*',
      'text/plain',
      'text/csv',
    ],
  },
  fields: [
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'client-profiles',
      label: 'לקוח',
      required: true,
      index: true,
    },
    { name: 'originalName', type: 'text', label: 'שם הקובץ המקורי' },
    { name: 'questionId', type: 'text', label: 'מזהה שאלה', index: true, admin: { readOnly: true } },
    { name: 'questionLabel', type: 'text', label: 'שאלה', admin: { readOnly: true } },
  ],
}
