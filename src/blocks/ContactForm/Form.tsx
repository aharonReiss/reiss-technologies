'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import React, { useActionState } from 'react'

import { Icon } from '@/components/Icon'
import { type LeadFormState, submitLead } from './actions'

type Props = {
  services: string[]
  submitLabel: string
  successMessage: string
  dark: boolean
}

const fieldClass =
  'w-full rounded-xl border border-line bg-white px-4 py-3.5 text-ink placeholder:text-body/50 transition focus:border-brand focus:ring-4 focus:ring-brand/10 focus:outline-none'

export function ContactFormClient({ services, submitLabel, successMessage, dark }: Props) {
  const pathname = usePathname()
  const params = useSearchParams()
  const [state, action, pending] = useActionState<LeadFormState, FormData>(submitLead, {
    status: 'idle',
  })

  if (state.status === 'success') {
    return (
      <div role="status" className="flex flex-col items-center rounded-card bg-white p-12 text-center">
        <span className="mb-6 grid size-16 place-items-center rounded-full bg-brand text-white">
          <Icon name="check" className="size-8" strokeWidth={2.5} />
        </span>
        <p className="font-display text-2xl font-bold text-ink">{successMessage}</p>
      </div>
    )
  }

  return (
    <form
      data-wa-avoid
      action={action}
      className={`relative grid gap-4 rounded-card p-6 sm:grid-cols-2 md:p-8 ${dark ? 'bg-ink-soft' : 'bg-white shadow-xl shadow-ink/5'}`}
    >
      <input type="hidden" name="page" value={pathname} />
      {['utm_source', 'utm_medium', 'utm_campaign'].map((k) => (
        <input key={k} type="hidden" name={k} value={params.get(k) ?? ''} />
      ))}
      <div aria-hidden className="pointer-events-none absolute size-px overflow-hidden opacity-0">
        <label>
          אתר
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field label="שם מלא" required>
        <input name="name" required autoComplete="name" className={fieldClass} />
      </Field>
      <Field label="טלפון" required>
        <input
          name="phone"
          type="tel"
          required
          dir="ltr"
          autoComplete="tel"
          className={`${fieldClass} text-end`}
        />
      </Field>
      <Field label="אימייל">
        <input name="email" type="email" dir="ltr" autoComplete="email" className={`${fieldClass} text-end`} />
      </Field>
      {services.length > 0 ? (
        <Field label="במה מדובר?">
          <select
            name="service"
            // Preselect the package chosen in the pricing block (?service=…).
            defaultValue={services.includes(params.get('service') ?? '') ? params.get('service')! : ''}
            className={fieldClass}
          >
            <option value="">בחרו…</option>
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
            <option>עדיין לא בטוחים</option>
            <option>אחר</option>
          </select>
        </Field>
      ) : (
        <Field label="שם העסק">
          <input name="company" autoComplete="organization" className={fieldClass} />
        </Field>
      )}
      <Field label="ספרו לנו קצת על הפרויקט" className="sm:col-span-2">
        <textarea name="message" rows={4} className={fieldClass} />
      </Field>

      {state.status === 'error' && (
        <p role="alert" className="text-sm font-medium text-red-600 sm:col-span-2">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60 sm:col-span-2">
        {pending ? 'שולח…' : submitLabel}
        {!pending && <Icon name="arrow" className="size-5" />}
      </button>
    </form>
  )
}

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string
  required?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <label className={`block ${className ?? ''}`}>
      <span className="mb-2 block text-sm font-medium [.section-dark_&]:text-white/80">
        {label}
        {required && <span className="text-brand"> *</span>}
      </span>
      {children}
    </label>
  )
}
