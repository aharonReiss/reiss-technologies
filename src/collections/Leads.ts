import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access'

/**
 * Contact-form submissions. Created only server-side by the contact form
 * handler (Local API), never directly through the public REST API.
 */
export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'ליד', plural: 'לידים' },
  access: {
    create: () => false,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: 'לידים',
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'email', 'service', 'status', 'createdAt'],
  },
  defaultSort: '-createdAt',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', label: 'שם', required: true },
        { name: 'phone', type: 'text', label: 'טלפון' },
        { name: 'email', type: 'email', label: 'אימייל' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'company', type: 'text', label: 'חברה' },
        { name: 'service', type: 'text', label: 'במה מדובר' },
      ],
    },
    { name: 'message', type: 'textarea', label: 'הודעה' },
    {
      name: 'status',
      type: 'select',
      label: 'סטטוס',
      defaultValue: 'new',
      options: [
        { label: 'חדש', value: 'new' },
        { label: 'בטיפול', value: 'in-progress' },
        { label: 'נסגר בהצלחה', value: 'won' },
        { label: 'לא רלוונטי', value: 'lost' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'notes', type: 'textarea', label: 'הערות פנימיות', admin: { position: 'sidebar' } },
    {
      name: 'source',
      type: 'group',
      label: 'מקור',
      admin: { readOnly: true },
      fields: [
        { name: 'page', type: 'text', label: 'עמוד' },
        { name: 'utmSource', type: 'text', label: 'utm_source' },
        { name: 'utmMedium', type: 'text', label: 'utm_medium' },
        { name: 'utmCampaign', type: 'text', label: 'utm_campaign' },
      ],
    },
  ],
}
