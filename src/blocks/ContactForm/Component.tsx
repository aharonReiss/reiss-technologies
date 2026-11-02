import React, { Suspense } from 'react'

import { Icon } from '@/components/Icon'
import { Eyebrow, Highlight, Section } from '@/components/Section'
import type { ContactFormBlock as ContactFormBlockProps } from '@/payload-types'
import { getGlobal, getPayloadClient } from '@/utilities/payload'
import { ContactFormClient } from './Form'

export async function ContactFormBlock({
  eyebrow,
  heading,
  intro,
  showContactDetails,
  serviceOptions,
  submitLabel,
  successMessage,
  background,
  anchor,
}: ContactFormBlockProps) {
  const payload = await getPayloadClient()
  const [settings, services] = await Promise.all([
    getGlobal('site-settings', 0),
    serviceOptions
      ? payload.find({
          collection: 'services',
          sort: '_order',
          limit: 20,
          depth: 0,
          select: { title: true },
          overrideAccess: false,
        })
      : null,
  ])
  const contact = settings.contact
  const dark = background === 'dark'

  const details = [
    contact?.phone && {
      icon: 'phone',
      label: 'טלפון',
      value: contact.phone,
      href: `tel:${contact.phone.replace(/[^\d+]/g, '')}`,
      ltr: true,
    },
    contact?.whatsapp && {
      icon: 'whatsapp',
      label: 'WhatsApp',
      value: 'שלחו הודעה',
      href: `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`,
    },
    contact?.email && {
      icon: 'mail',
      label: 'אימייל',
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    contact?.hours && { icon: 'clock', label: 'שעות פעילות', value: contact.hours },
  ].filter(Boolean) as { icon: string; label: string; value: string; href?: string; ltr?: boolean }[]

  return (
    <Section background={background} anchor={anchor}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div data-reveal="start" className="lg:col-span-5">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {heading && (
            <h2 className="text-3xl leading-tight font-bold md:text-[2.75rem]">
              <Highlight text={heading} />
            </h2>
          )}
          {intro && <p className="mt-5 text-lg leading-relaxed">{intro}</p>}

          {showContactDetails && details.length > 0 && (
            <ul className="mt-10 space-y-3">
              {details.map((d) => {
                const inner = (
                  <>
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                      <Icon name={d.icon} className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm">{d.label}</span>
                      <span
                        className={`block font-semibold ${dark ? 'text-white' : 'text-ink'}`}
                        dir={d.ltr ? 'ltr' : undefined}
                      >
                        {d.value}
                      </span>
                    </span>
                  </>
                )
                return (
                  <li key={d.label}>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="flex items-center gap-4 rounded-2xl p-2 transition hover:bg-current/5"
                        {...(d.href.startsWith('http')
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-2">{inner}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <div data-reveal="end" className="lg:col-span-7">
          <Suspense>
            <ContactFormClient
              services={services?.docs.map((s) => s.title) ?? []}
              submitLabel={submitLabel || 'שליחה'}
              successMessage={successMessage || 'תודה! נחזור אליכם בהקדם.'}
              dark={dark}
            />
          </Suspense>
        </div>
      </div>
    </Section>
  )
}
