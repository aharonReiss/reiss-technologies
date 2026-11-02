import Link from 'next/link'
import React from 'react'

import type { Page, Project, Service, ServiceMenuBlock as ServiceMenuBlockProps } from '@/payload-types'
import { resolveHref } from '@/components/CMSLink'
import { formatPrice } from '@/utilities/format'
import { getPayloadClient } from '@/utilities/payload'
import { docPath } from '@/utilities/routes'
import { KeepRowInView } from './KeepRowInView'

const pad = (n: number) => String(n).padStart(2, '0')

/** "החל מ־3,500 ₪" only for a price the studio has approved and chosen to show. */
const priceLabel = (s: Service) =>
  s.pricing?.price && s.pricing.showPrice !== false ? `החל מ־${formatPrice(s.pricing.price)}` : 'מחיר בהתאם לפרויקט'

/**
 * The services page opening: the H1, a short paragraph, then one editorial row per
 * service – number, name, one line, starting price. A row opens in place to a
 * short panel (one at a time, native <details>, so it works and is indexed with
 * no JavaScript). The panel's button carries the service to the contact form.
 */
export async function ServiceMenuBlock({ heading, intro, services: selected, note, proofLead, proof, contactPage, anchor }: ServiceMenuBlockProps) {
  let services = (selected ?? []).filter((s): s is Service => typeof s === 'object')
  if (services.length === 0) {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'services', sort: '_order', limit: 12, depth: 1, overrideAccess: false })
    services = res.docs
  }
  const contactSlug = contactPage && typeof contactPage === 'object' ? (contactPage as Page).slug : 'contact'
  const contactHref = (type?: string | null) =>
    `${docPath('pages', contactSlug)}${type ? `?type=${encodeURIComponent(type)}` : ''}`
  const title = heading.replace(/\.$/, '')
  const proofHref = proof?.label ? resolveHref(proof) : null

  return (
    <section id={anchor || undefined} className="bg-muted text-ink">
      <div className="container-site pt-[calc(72px+2rem)] pb-16 md:pt-[calc(72px+8vh)] md:pb-[12vh]">
        <header className="max-w-[46rem]">
          <h1 className="m-0 font-display text-[clamp(3rem,14vw,4.2rem)] leading-[0.95] font-black tracking-[-0.045em] !text-ink md:text-[min(7.4vw,13svh,7.5rem)]">
            {title}
            <span className="text-brand">.</span>
          </h1>
          {intro && (
            <p className="mt-4 mb-0 max-w-[44ch] text-[1.0625rem] leading-[1.7] text-body md:mt-6 md:text-xl">{intro}</p>
          )}
        </header>

        <div className="mt-10 border-t border-ink/15 md:mt-[7vh]">
          {services.map((s, i) => {
            const m = s.menu
            const project = m?.exampleProject && typeof m.exampleProject === 'object' ? (m.exampleProject as Project) : null
            const caps = m?.capabilities ?? []
            const name = s.title.replace(/\.$/, '')
            return (
              <details
                key={s.id}
                id={s.slug || undefined}
                name="services"
                data-type={m?.contactType || undefined}
                className="svc-row group border-b border-ink/15 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-start gap-x-4 gap-y-2 py-6 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand md:grid-cols-12 md:items-center md:gap-x-8 md:py-9">
                  <span dir="ltr" className="pt-2 font-display text-sm font-bold tracking-[0.12em] text-brand md:col-span-1 md:pt-0">
                    {pad(i + 1)}
                  </span>
                  <h2 className="m-0 font-display text-[clamp(1.6rem,7vw,2rem)] leading-[1.05] font-black tracking-[-0.03em] !text-ink transition-colors duration-300 group-hover:!text-brand md:col-span-4 md:text-[clamp(1.9rem,2.6vw,2.6rem)]">
                    {name}
                    <span className="text-brand">.</span>
                  </h2>
                  <span
                    aria-hidden
                    className="relative mt-1 size-10 shrink-0 rounded-full border border-ink/20 transition duration-300 group-hover:border-brand group-open:rotate-45 group-open:border-brand group-open:bg-brand md:order-last md:col-span-1 md:justify-self-end before:absolute before:inset-x-3 before:top-1/2 before:h-0.5 before:-translate-y-1/2 before:bg-current after:absolute after:inset-y-3 after:left-1/2 after:w-0.5 after:-translate-x-1/2 after:bg-current group-open:text-white motion-reduce:transition-none"
                  />
                  <p className="col-span-2 col-start-2 m-0 max-w-[46ch] text-base leading-[1.6] text-body md:col-span-4 md:col-start-auto md:text-[1.0625rem]">
                    {s.excerpt}
                  </p>
                  <p className="col-span-2 col-start-2 m-0 font-display text-base font-bold text-ink md:col-span-2 md:col-start-auto md:text-end md:text-lg">
                    {priceLabel(s)}
                    {s.pricing?.price && s.pricing.showPrice !== false && s.pricing.priceNote && (
                      <span className="block font-sans text-xs font-normal text-body">{s.pricing.priceNote}</span>
                    )}
                  </p>
                </summary>

                <div className="grid gap-6 pb-10 md:grid-cols-12 md:gap-x-8 md:pb-12">
                  <div className="md:col-span-5 md:col-start-2">
                    {m?.text && (
                      <p className="m-0 max-w-[30ch] font-display text-xl leading-[1.35] font-bold tracking-tight text-ink md:text-2xl">
                        {m.text}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-6">
                    {caps.length > 0 && (
                      <>
                      <p className="m-0 mb-3 text-sm text-body">יכול לכלול, לפי היקף הפרויקט:</p>
                      <ul className="m-0 grid list-none gap-x-8 gap-y-2.5 p-0 sm:grid-cols-2">
                        {caps.slice(0, 4).map((c) => (
                          <li key={c.id} className="flex items-baseline gap-3 text-[0.95rem] leading-snug text-ink md:text-base">
                            <span aria-hidden className="size-1.5 shrink-0 translate-y-[-0.15em] rounded-full bg-brand" />
                            {c.text}
                          </li>
                        ))}
                      </ul>
                      </>
                    )}
                    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <Link
                        href={contactHref(m?.contactType)}
                        className="inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-6 font-display text-base font-bold whitespace-nowrap text-white no-underline transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                      >
                        {m?.ctaLabel || 'בואו נדבר'}
                        <span aria-hidden>←</span>
                      </Link>
                      {project?.slug && (
                        <Link
                          href={docPath('projects', project.slug)}
                          className="text-[0.95rem] font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:text-brand hover:decoration-brand"
                        >
                          לדוגמה: {project.title.split(/[,،]/)[0].trim()}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </details>
            )
          })}
        </div>

        <div className="mt-6 flex flex-col gap-3 md:mt-8 md:flex-row md:items-baseline md:justify-between md:gap-8">
          {note && <p className="m-0 max-w-[60ch] text-sm leading-relaxed text-body md:text-base">{note}</p>}
          {proofHref && (
            <p className="m-0 text-sm text-body md:text-base">
              {proofLead && <>{proofLead} </>}
              <Link
                href={proofHref}
                className="font-semibold whitespace-nowrap text-ink underline decoration-ink/30 underline-offset-4 hover:text-brand hover:decoration-brand"
              >
                {proof!.label}
                <span aria-hidden> ←</span>
              </Link>
            </p>
          )}
        </div>
      </div>
      <KeepRowInView />
    </section>
  )
}
