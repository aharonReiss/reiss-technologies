'use server'

import { getPayloadClient } from '@/utilities/payload'

export type LeadFormState = { status: 'idle' | 'success' | 'error'; message?: string }

const str = (v: FormDataEntryValue | null, max = 500) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

export async function submitLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  // Honeypot: real users never fill this hidden field.
  if (str(formData.get('website'))) return { status: 'success' }

  const name = str(formData.get('name'), 120)
  const phone = str(formData.get('phone'), 40)
  const email = str(formData.get('email'), 200)

  if (!name || (!phone && !email)) {
    return { status: 'error', message: 'נא למלא שם וטלפון או אימייל.' }
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', message: 'כתובת האימייל לא תקינה.' }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'leads',
      data: {
        name,
        phone,
        email: email || undefined,
        company: str(formData.get('company'), 120),
        service: str(formData.get('service'), 120),
        message: str(formData.get('message'), 4000),
        source: {
          page: str(formData.get('page'), 300),
          utmSource: str(formData.get('utm_source'), 100),
          utmMedium: str(formData.get('utm_medium'), 100),
          utmCampaign: str(formData.get('utm_campaign'), 100),
        },
      },
    })
    return { status: 'success' }
  } catch (err) {
    console.error('Lead submission failed', err)
    return { status: 'error', message: 'משהו השתבש. נסו שוב או התקשרו אלינו.' }
  }
}
