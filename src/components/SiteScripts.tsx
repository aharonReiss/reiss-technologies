import Script from 'next/script'
import React from 'react'

import { getGlobal } from '@/utilities/payload'
import { absoluteURL } from '@/utilities/routes'
import { jsonLd, shareImage } from '@/utilities/seo'

/**
 * Everything third-party, driven by Site Settings: Google Analytics 4 (only with
 * a Measurement ID), the Pashut Nagish accessibility widget, and the studio's
 * Organization / WebSite structured data shared by every page.
 */
export async function SiteScripts() {
  const settings = await getGlobal('site-settings', 1)
  const { contact, seo, integrations } = settings
  const ga = integrations?.ga4Id?.trim()
  const gaOk = ga && /^G-[A-Z0-9]+$/i.test(ga)
  const a11y = integrations?.accessibility
  const home = absoluteURL('/')
  const name = settings.siteName || 'REISS DIGITAL'
  const logo = shareImage(settings.logo)?.url || absoluteURL('/brand/logo-light-bg.svg')
  // Real profiles only: a bare network homepage (https://facebook.com) is a placeholder.
  const sameAs = (contact?.social ?? [])
    .map((s) => s.url)
    .filter((u) => u && !/^https?:\/\/(www\.)?[^/]+\/?$/.test(u))

  const structured = [
    {
      '@context': 'https://schema.org',
      '@type': seo?.organizationType || 'ProfessionalService',
      '@id': `${home}#organization`,
      name,
      url: home,
      logo,
      image: shareImage(seo?.defaultImage)?.url || logo,
      description: seo?.defaultDescription || settings.tagline || undefined,
      telephone: contact?.phone || undefined,
      email: contact?.email || undefined,
      address: contact?.address ? { '@type': 'PostalAddress', streetAddress: contact.address, addressCountry: 'IL' } : undefined,
      areaServed: { '@type': 'Country', name: 'Israel' },
      knowsLanguage: ['he', 'en'],
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${home}#website`,
      name,
      url: home,
      inLanguage: 'he',
      publisher: { '@id': `${home}#organization` },
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structured)} />

      {gaOk && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}');`}
          </Script>
        </>
      )}

      {a11y?.enabled !== false && (
        <Script
          src="https://nagish.pashut.app/widget.js"
          strategy="afterInteractive"
          data-lang="he"
          data-position={a11y?.position || 'left'}
          data-color="#4355f5"
          data-statement={a11y?.statementUrl || undefined}
          data-email={a11y?.email || contact?.email || undefined}
        />
      )}
    </>
  )
}
