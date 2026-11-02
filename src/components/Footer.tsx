import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/CMSLink'
import { Icon } from '@/components/Icon'
import { Logo } from '@/components/Logo'
import { getGlobal } from '@/utilities/payload'

export async function Footer() {
  const [footer, settings] = await Promise.all([
    getGlobal('footer', 1),
    getGlobal('site-settings', 1),
  ])
  const siteName = settings.siteName ?? 'REISS DIGITAL'
  const contact = settings.contact
  const logo = typeof settings.logoLight === 'object' ? settings.logoLight : null
  const copyright = (footer.copyright ?? '').replace('{year}', String(new Date().getFullYear()))

  return (
    <footer className="bg-ink text-white/60">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Link href="/" aria-label={`${siteName}, דף הבית`} className="inline-block">
            <Logo logo={logo} siteName={siteName} inverted />
          </Link>
          {footer.about && <p className="mt-6 max-w-sm leading-relaxed">{footer.about}</p>}
          {(contact?.social ?? []).length > 0 && (
            <ul className="mt-8 flex gap-2">
              {contact!.social!.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="grid size-10 place-items-center rounded-full border border-white/15 transition hover:border-white hover:text-white"
                  >
                    <Icon name={s.platform} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {(footer.columns ?? []).map((col) => (
          <div key={col.id} className="md:col-span-2">
            <h3 className="mb-5 font-sans text-sm font-semibold tracking-wide text-white">
              {col.title}
            </h3>
            <ul className="space-y-3">
              {(col.links ?? []).map((l) => (
                <li key={l.id}>
                  <CMSLink link={l.link} appearance="none" className="transition hover:text-white" />
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-2">
          <h3 className="mb-5 font-sans text-sm font-semibold tracking-wide text-white">
            יצירת קשר
          </h3>
          <ul className="space-y-3">
            {contact?.phone && (
              <li>
                <a
                  href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                  className="flex items-center gap-2 hover:text-white"
                >
                  <Icon name="phone" className="size-4" />
                  <span dir="ltr">{contact.phone}</span>
                </a>
              </li>
            )}
            {contact?.email && (
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-white">
                  <Icon name="mail" className="size-4" />
                  {contact.email}
                </a>
              </li>
            )}
            {contact?.address && (
              <li className="flex items-center gap-2">
                <Icon name="pin" className="size-4" />
                {contact.address}
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-4 py-6 text-sm md:flex-row md:items-center md:justify-between">
          <p>{copyright}</p>
          {(footer.bottomLinks ?? []).length > 0 && (
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footer.bottomLinks!.map((l) => (
                <li key={l.id}>
                  <CMSLink link={l.link} appearance="none" className="hover:text-white" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
