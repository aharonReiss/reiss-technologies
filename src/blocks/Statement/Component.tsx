import Link from 'next/link'
import React from 'react'

import { resolveHref } from '@/components/CMSLink'

import type { StatementBlock as StatementBlockProps } from '@/payload-types'

/** A pause between sections: one large line on navy, one phrase in Electric Blue. */
export function StatementBlock({ heading, text, cta, ctaNote, anchor }: StatementBlockProps) {
  const parts = heading.split(/\*([^*]+)\*/)
  const href = cta?.label ? resolveHref(cta) : null
  return (
    <section id={anchor || undefined} className="section-dark bg-ink text-white/70">
      <div className="container-site py-[14svh] md:py-[18svh]">
        <h2 className="m-0 max-w-[20ch] font-display text-[clamp(2.3rem,10vw,3.4rem)] leading-[1.02] font-black tracking-[-0.04em] !text-white md:text-[min(5.6vw,10svh,5.8rem)]">
          {parts.map((p, i) => (i % 2 ? <span key={i} className="block text-brand">{p}</span> : p))}
        </h2>
        {text && (
          <p data-reveal className="mt-6 mb-0 max-w-[44ch] text-lg leading-[1.7] text-white/75 md:mt-8 md:text-xl">
            {text}
          </p>
        )}
        {href && (
          <div data-reveal style={{ '--i': 1 } as React.CSSProperties} className="mt-7 md:mt-8">
            {/* For the visitor who is not sure yet: the contact form opens with no service chosen. */}
            <Link
              href={href}
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-brand px-7 font-display text-[1.0625rem] font-bold whitespace-nowrap text-white max-[380px]:w-full sm:px-8 sm:text-lg no-underline transition-colors hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {cta!.label}
              <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            </Link>
            {ctaNote && <p className="mt-4 mb-0 text-sm leading-relaxed text-white/55">{ctaNote}</p>}
          </div>
        )}
      </div>
    </section>
  )
}
