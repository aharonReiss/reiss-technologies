import React from 'react'

import { CMSLink } from '@/components/CMSLink'
import type { ManifestoBlock as ManifestoBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { ColorReveal } from './ColorReveal'
import { FitLines } from './FitLines'
import { FounderPortrait } from './FounderPortrait'

/**
 * The section right after the hero: one reassurance in two lines (the last, in
 * Electric Blue, carries the weight), the approach in a sentence, the person behind
 * the studio, and a short typographic menu onward. Each line rises out of its own
 * mask as it reaches the reading zone; no pinning. Optional manifesto lines render
 * between headline and approach when the CMS has them.
 */
const pad = (n: number) => String(n).padStart(2, '0')

export function ManifestoBlock({
  question,
  lines,
  approach,
  person,
  index,
  anchor,
}: ManifestoBlockProps) {
  const items = (lines ?? []).map((l) => l.text?.trim().replace(/[.。]+$/, '')).filter(Boolean)
  const heads = (question ?? '')
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean)
  const links = index ?? []
  const who = person?.name || person?.text ? person : null

  return (
    // data-lights-off: the portfolio that follows dims this section with itself.
    <section id={anchor || undefined} data-lights-off className="bg-muted text-ink">
      <div className="container-site pt-12 pb-10 md:pt-[14vh] md:pb-[9vh]">
        {heads.length > 0 && (
          <h2 className="m-0 font-display !text-ink">
            {heads.map((line, i) => {
              const last = i === heads.length - 1 && heads.length > 1
              return (
                <span key={i} className="block overflow-hidden pb-[0.08em]">
                  <span
                    data-reveal="mask"
                    suppressHydrationWarning
                    style={{ '--i': i * 2 } as React.CSSProperties}
                    className={cn(
                      'block',
                      last
                        ? 'mt-1 text-[clamp(3rem,14.6vw,4.7rem)] leading-[0.98] font-black tracking-[-0.045em] text-brand md:mt-2 md:text-[min(8.6vw,15svh,9.5rem)]'
                        : 'text-[clamp(1.75rem,7.9vw,2.6rem)] leading-[1.1] font-light tracking-[-0.03em] md:text-[min(4.1vw,7svh,4.4rem)]',
                    )}
                  >
                    {last ? line.replace(/\.$/, '') : line}
                    {last && line.endsWith('.') && <span className="text-ink">.</span>}
                  </span>
                </span>
              )
            })}
          </h2>
        )}
        {items.length > 0 && (
          <FitLines className="m-0 mt-12 !text-ink md:[container-type:inline-size]">
            {items.map((text, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <span
                  data-reveal="mask"
                  suppressHydrationWarning
                  style={{ '--i': i } as React.CSSProperties}
                  className="type-display block text-[12vw] leading-[0.98] font-extrabold md:w-max md:text-[length:var(--fit,min(9.75rem,calc(100cqw/7.85)))] md:whitespace-nowrap"
                >
                  {text}
                  <span className="manifesto-dot text-brand">.</span>
                </span>
              </span>
            ))}
          </FitLines>
        )}
      </div>

      {(approach || who || links.length > 0) && (
        <div className="container-site">
          <div
            className={cn(
              // Desktop: the white below the paragraph is where it holds before lights off.
              'grid gap-10 pb-16 md:grid-cols-12 md:gap-x-16 md:pb-[30vh]',
              approach && 'border-t border-line pt-8 md:pt-12',
            )}
          >
            {approach && (
              <ColorReveal
                text={approach}
                className="m-0 max-w-[30ch] font-display text-[clamp(1.3rem,5.6vw,1.6rem)] leading-[1.5] font-normal text-ink md:col-span-7 md:text-[clamp(1.5rem,2.3vw,2.25rem)]"
              />
            )}
            {(who || links.length > 0) && (
              <div className="grid content-start md:col-span-5">
                {who && (
                  // The person behind the studio: a transparent cutout standing on the menu's
                  // top hairline, beside two or three true sentences. Restrained in size, so
                  // the headline above stays the strongest element.
                  <div className="flex items-end gap-4 md:gap-6">
                    <div
                      data-reveal
                      style={{ '--i': 1 } as React.CSSProperties}
                      className="min-w-0 flex-1 pb-5 md:pb-7"
                    >
                      {who.name && (
                        <p className="m-0 font-display text-lg leading-tight font-bold text-ink">
                          {who.name}
                          {who.role && (
                            <span className="block text-sm font-medium text-body">{who.role}</span>
                          )}
                        </p>
                      )}
                      {who.text && (
                        <p className="mt-3 mb-0 text-[0.95rem] leading-[1.65] text-body">
                          {who.text}
                        </p>
                      )}
                    </div>
                    {person?.portrait && (
                      <FounderPortrait
                        portrait={person.portrait}
                        smile={person.portraitSmile}
                        className="w-32 shrink-0 md:w-[11.5rem]"
                      />
                    )}
                  </div>
                )}
                {links.length > 0 && (
                  <ul
                    data-reveal
                    data-wa-avoid
                    style={{ '--i': 1 } as React.CSSProperties}
                    className="m-0 list-none border-t border-line p-0"
                  >
                    {links.map(({ id, link }, i) => (
                      <li key={id}>
                        <CMSLink
                          link={link}
                          appearance="none"
                          className="group flex min-h-14 items-baseline gap-4 border-b border-line py-3.5 text-ink no-underline transition-colors hover:text-brand focus-visible:text-brand md:py-5"
                        >
                          <span
                            dir="ltr"
                            className="w-6 shrink-0 font-display text-xs font-bold tracking-[0.1em] text-brand"
                          >
                            {pad(i + 1)}
                          </span>
                          <span className="flex-1 font-display text-[1.7rem] leading-[1.1] font-extrabold tracking-[-0.025em] md:text-[clamp(1.9rem,2.5vw,2.6rem)]">
                            {link?.label}
                          </span>
                          <span
                            aria-hidden
                            className="text-xl transition-transform duration-300 group-hover:-translate-x-2 md:text-2xl"
                          >
                            ←
                          </span>
                        </CMSLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
