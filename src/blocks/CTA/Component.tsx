import React from 'react'

import { CMSLink } from '@/components/CMSLink'
import { Highlight } from '@/components/Section'
import type { CTABlock as CTABlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'

export function CTABlock({ heading, text, links, background, anchor }: CTABlockProps) {
  if (background === 'brand') {
    // The page's closing invitation: Electric Blue edge to edge, one large line, one action.
    const title = heading.replace(/\*/g, '').replace(/\.$/, '')
    const primary = links?.[0]?.link
    return (
      <section id={anchor || undefined} className="section-dark bg-brand text-white">
        <div className="container-site py-[16svh] md:py-[20svh]">
          <h2 className="m-0 max-w-[14ch] font-display text-[clamp(3rem,14.5vw,5rem)] leading-[0.95] font-black tracking-[-0.045em] !text-white md:text-[min(8.4vw,15svh,9.5rem)]">
            {title.split(' ').map((w, i, all) => (
              <React.Fragment key={i}>
                {/* Each word rises out of its own mask; the navy full stop rides on the last. */}
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span data-reveal="mask" suppressHydrationWarning style={{ '--i': i } as React.CSSProperties} className="inline-block">
                    {w}
                    {/* A question or exclamation keeps its own mark instead. */}
                    {i === all.length - 1 && !/[?!]$/.test(w) && <span className="text-ink">.</span>}
                  </span>
                </span>
                {i < all.length - 1 && ' '}
              </React.Fragment>
            ))}
          </h2>
          <div className="mt-10 grid gap-8 md:mt-[8vh] md:grid-cols-12 md:items-end">
            {text && (
              <p data-reveal className="m-0 max-w-[46ch] text-lg leading-[1.7] text-white/90 md:col-span-7 md:text-xl">
                {text}
              </p>
            )}
            {primary && (
              <div data-reveal style={{ '--i': 1 } as React.CSSProperties} className="md:col-span-5 md:justify-self-end">
                <CMSLink
                  link={primary}
                  appearance="none"
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-7 font-display text-[1.0625rem] font-bold whitespace-nowrap text-ink max-[380px]:w-full sm:px-8 sm:text-lg no-underline transition-colors hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {primary.label}
                  <span aria-hidden>←</span>
                </CMSLink>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
  const dark = background !== 'light' && background !== 'muted'
  return (
    <section id={anchor || undefined} className="py-10 md:py-16">
      <div className="container-site">
        <div
          data-reveal="scale"
          className={cn(
            'relative overflow-hidden rounded-[2rem] px-8 py-16 text-center md:px-16 md:py-24',
            dark ? 'section-dark bg-ink text-white/70' : 'bg-brand-soft',
          )}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 left-1/2 size-[36rem] -translate-x-1/2"
          >
            <div className="size-full animate-glow rounded-full bg-brand/40 blur-3xl motion-reduce:animate-none" />
          </div>
          <div className="relative mx-auto max-w-3xl">
            <h2
              className={cn(
                'text-3xl leading-tight font-extrabold md:text-5xl',
                dark && 'text-white',
              )}
            >
              <Highlight text={heading} className={dark ? 'text-brand' : undefined} />
            </h2>
            {text && <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed">{text}</p>}
            {links && links.length > 0 && (
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                {links.map(({ id, link }, i) => (
                  <CMSLink
                    key={id}
                    link={link}
                    appearance={dark && i === 0 ? 'none' : undefined}
                    className={cn(dark && i === 0 && 'btn-accent', dark && i > 0 && 'text-white')}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
