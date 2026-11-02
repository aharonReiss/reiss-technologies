import Link from 'next/link'
import React from 'react'

import { resolveHref } from '@/components/CMSLink'
import type { CapabilitiesBlock as CapabilitiesBlockProps } from '@/payload-types'

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * What we know how to do, after the service cards: a three-word statement that
 * rises line by line, the capabilities as one quiet index, a note on what is
 * included versus added per project, and the way on to the services page.
 */
export function CapabilitiesBlock({ statement, items, note, closing, link, anchor }: CapabilitiesBlockProps) {
  const words = statement.split(/(?<=\.)\s+/).filter(Boolean)
  const list = items ?? []
  const href = resolveHref(link)

  return (
    <section id={anchor || undefined} aria-label={statement} className="bg-muted text-ink">
      <div className="container-site py-[14svh] md:py-[18svh]">
        <h2 className="m-0 !text-ink md:flex md:flex-wrap md:gap-x-[0.28em]">
          {words.map((w, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <span
                data-reveal="mask"
                suppressHydrationWarning
                style={{ ['--i' as string]: i }}
                className="type-display block text-[clamp(3.6rem,19vw,6rem)] md:text-[min(10.4vw,10.5rem)]"
              >
                {w.replace(/\.$/, '')}
                <span className="manifesto-dot text-brand">.</span>
              </span>
            </span>
          ))}
        </h2>

        {list.length > 0 && (
          <div className="mt-[8svh] grid gap-10 md:mt-[12svh] md:grid-cols-12 md:gap-12">
            <ul className="m-0 grid list-none border-t border-line p-0 sm:grid-cols-2 sm:gap-x-10 md:col-span-8">
              {list.map((item, i) => (
                <li
                  key={item.id ?? i}
                  data-reveal
                  style={{ ['--i' as string]: i % 4 }}
                  className="flex items-baseline gap-4 border-b border-line py-4 font-display text-[1.35rem] leading-tight font-bold md:py-5 md:text-[clamp(1.35rem,1.9vw,1.9rem)]"
                >
                  <span className="font-sans text-xs font-bold tabular-nums text-brand" dir="ltr">
                    {pad(i + 1)}
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
            {note && (
              <p data-reveal className="m-0 max-w-[36ch] text-[0.95rem] leading-[1.7] text-body md:col-span-4 md:self-end">
                {note}
              </p>
            )}
          </div>
        )}

        {(closing || href) && (
          <div className="mt-[12svh] border-t border-ink pt-[6svh] md:mt-[16svh] md:grid md:grid-cols-12 md:items-end md:gap-12">
            {closing && (
              <p data-reveal className="m-0 font-display text-[clamp(1.9rem,7.6vw,2.6rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-ink md:col-span-8 md:text-[clamp(2.4rem,3.9vw,4rem)]">
                {closing}
              </p>
            )}
            {href && (
              <div data-reveal style={{ ['--i' as string]: 1 }} className="mt-8 md:col-span-4 md:mt-0 md:justify-self-end">
                <Link href={href} className="btn-primary">
                  {link?.label || 'לכל השירותים'}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
