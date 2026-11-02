import Link from 'next/link'
import React from 'react'

import { Icon } from '@/components/Icon'
import { Section, SectionHeader } from '@/components/Section'
import type { PricingBlock as PricingBlockProps, Service } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { formatPrice } from '@/utilities/format'
import { getPayloadClient } from '@/utilities/payload'
import { docPath } from '@/utilities/routes'

export async function PricingBlock({
  eyebrow,
  heading,
  intro,
  services: selected,
  contactPage,
  ctaLabel,
  note,
  background,
  anchor,
}: PricingBlockProps) {
  let services = (selected ?? []).filter((s): s is Service => typeof s === 'object')
  if (services.length === 0) {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'services',
      sort: '_order',
      limit: 6,
      depth: 0,
      overrideAccess: false,
    })
    services = res.docs
  }

  const contactSlug = contactPage && typeof contactPage === 'object' ? contactPage.slug : 'contact'
  const quoteHref = (service: Service) =>
    `${docPath('pages', contactSlug)}?service=${encodeURIComponent(service.title)}#contact`

  return (
    <Section background={background} anchor={anchor}>
      <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro} align="center" />
      <div
        className={cn(
          'mx-auto grid items-stretch gap-6',
          services.length === 2 && 'max-w-4xl md:grid-cols-2',
          services.length >= 3 && 'md:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {services.map((service, index) => {
          const { price, priceNote, badge, purpose, idealFor, niches, included, process, highlighted } =
            service.pricing ?? {}
          const subtle = highlighted ? 'text-white/85' : 'text-ink'
          return (
            <article
              key={service.id}
              data-reveal
              style={{ '--i': index } as React.CSSProperties}
              className={cn(
                'relative flex flex-col rounded-[1.75rem] p-8 md:p-9',
                highlighted
                  ? 'section-dark glow-border text-white/70 shadow-2xl shadow-brand/25 lg:-my-4 lg:py-12'
                  : 'border border-line bg-white',
              )}
            >
              {badge && (
                <span
                  className={cn(
                    'absolute -top-3.5 start-8 rounded-full px-4 py-1 text-sm font-semibold',
                    highlighted ? 'bg-brand text-white' : 'bg-brand text-white',
                  )}
                >
                  {badge}
                </span>
              )}
              <span
                className={cn(
                  'mb-6 grid size-12 place-items-center rounded-2xl',
                  highlighted ? 'bg-white/10 text-white' : 'bg-brand-soft text-brand',
                )}
              >
                <Icon name={service.icon ?? 'code'} className="size-6" />
              </span>
              <h3 className={cn('text-2xl font-bold', highlighted && 'text-white')}>{service.title}</h3>
              {purpose && <p className="mt-3 text-[15px] leading-relaxed">{purpose}</p>}

              {niches && niches.length > 0 ? (
                <div className="mt-5">
                  <span className={cn('mb-2 block text-sm font-semibold', subtle)}>מתאים ל:</span>
                  <ul className="flex flex-wrap gap-1.5">
                    {niches.map((n) => (
                      <li
                        key={n.id}
                        className={cn(
                          'rounded-full px-3 py-1 text-[13px] font-medium',
                          highlighted ? 'bg-white/10 text-white/90' : 'bg-brand-soft text-brand-dark',
                        )}
                      >
                        {n.text}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                idealFor && <p className="mt-2 text-[15px]">{idealFor}</p>
              )}

              <div className="mt-7 mb-7 border-b border-current/10 pb-7">
                {price ? (
                  <>
                    <span className="block text-sm">החל מ־</span>
                    <span
                      className={cn(
                        'font-display text-5xl font-bold tracking-tight',
                        highlighted ? 'text-white' : 'text-ink',
                      )}
                    >
                      {formatPrice(price)}
                    </span>
                    {priceNote && <span className="ms-2 text-sm">{priceNote}</span>}
                  </>
                ) : (
                  <>
                    <span className="block text-sm">מחיר</span>
                    <span
                      className={cn(
                        'font-display text-3xl font-bold',
                        highlighted ? 'text-white' : 'text-ink',
                      )}
                    >
                      הצעת מחיר מותאמת
                    </span>
                  </>
                )}
              </div>

              {included && included.length > 0 && (
                <ul className="mb-8 space-y-3">
                  <li className={cn('text-sm font-semibold', subtle)}>מה כלול</li>
                  {included.map((item) => (
                    <li key={item.id} className="flex items-start gap-3 text-[15px]">
                      <span
                        className={cn(
                          'mt-0.5 grid size-5 shrink-0 place-items-center rounded-full',
                          highlighted ? 'bg-brand text-white' : 'bg-brand-soft text-brand',
                        )}
                      >
                        <Icon name="check" className="size-3" strokeWidth={3} />
                      </span>
                      <span className={subtle}>{item.text}</span>
                    </li>
                  ))}
                </ul>
              )}

              {process && process.length > 0 && (
                <div className="mb-9 rounded-2xl bg-current/[0.04] p-5">
                  <span className={cn('mb-3 block text-sm font-semibold', subtle)}>מה התהליך כולל</span>
                  <ol className="space-y-2.5">
                    {process.map((step, i) => (
                      <li key={step.id} className="flex items-start gap-3 text-[14px] leading-snug">
                        <span
                          dir="ltr"
                          className={cn(
                            'grid size-6 shrink-0 place-items-center rounded-full border text-xs font-bold',
                            highlighted ? 'border-white/25 text-white' : 'border-brand/30 text-brand',
                          )}
                        >
                          {i + 1}
                        </span>
                        <span className="pt-0.5">{step.text}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <div data-wa-avoid className="mt-auto flex flex-col gap-3">
                <Link
                  href={quoteHref(service)}
                  className={cn(highlighted ? 'btn-accent' : 'btn-primary', 'w-full')}
                >
                  {ctaLabel || 'לקבלת הצעה'}
                </Link>
                <Link
                  href={docPath('services', service.slug)}
                  className={cn(
                    'text-center text-sm font-semibold underline-offset-4 hover:underline',
                    highlighted ? 'text-white/80' : 'text-ink',
                  )}
                >
                  פרטים נוספים
                </Link>
              </div>
            </article>
          )
        })}
      </div>
      {note && <p className="mx-auto mt-12 max-w-2xl text-center text-sm">{note}</p>}
    </Section>
  )
}
