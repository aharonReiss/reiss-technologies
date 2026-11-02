import React from 'react'

import { CMSLink } from '@/components/CMSLink'
import { Media } from '@/components/Media'
import { Eyebrow, Highlight, Section } from '@/components/Section'
import { Signature } from '@/components/Signature'
import type { FounderBlock as FounderBlockProps } from '@/payload-types'

export function FounderBlock({
  eyebrow,
  quote,
  text,
  portrait,
  signatureText,
  signatureImage,
  name,
  role,
  links,
  background,
  anchor,
}: FounderBlockProps) {
  const dark = background === 'dark'
  const ink = dark ? 'text-white' : 'text-ink'

  // Without a portrait: a centred statement – big quote, highlighter, signature.
  if (!portrait) {
    return (
      <Section background={background} anchor={anchor} className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/[0.07] blur-3xl"
        />
        <div data-reveal className="mx-auto max-w-5xl text-center">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <div aria-hidden className="mx-auto mt-1 mb-9 h-1 w-16 rounded-full bg-brand" />
          <blockquote
            className={`font-display text-[1.85rem] leading-[1.35] font-bold md:text-[2.5rem] md:leading-[1.4] lg:text-[2.75rem] ${ink}`}
          >
            {/* The key phrase gets a highlighter stroke once the section is on screen */}
            <QuoteLines text={quote} />
          </blockquote>
          {text && <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed md:text-xl">{text}</p>}

          <div className="mt-12 flex flex-col items-center">
            <Signature
              image={signatureImage}
              text={signatureText}
              className={`h-20 text-6xl md:h-24 md:text-7xl ${ink}`}
            />
            {(name || role) && (
              <p className="mt-2 text-sm">
                {name && <span className={`font-semibold ${ink}`}>{name}</span>}
                {name && role && ' · '}
                {role}
              </p>
            )}
          </div>
          {links && links.length > 0 && (
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {links.map(({ id, link }) => (
                <CMSLink key={id} link={link} />
              ))}
            </div>
          )}
        </div>
      </Section>
    )
  }

  return (
    <Section background={background} anchor={anchor}>
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        {portrait && (
          <div data-reveal="start" className="relative lg:col-span-5">
            <div className="relative isolate aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-b from-brand to-brand-dark">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.25),transparent_45%)]"
              />
              <div
                aria-hidden
                className="absolute top-[-15%] left-[20%] -z-10 h-[140%] w-16 rotate-[24deg] bg-white/10"
              />
              <div className="absolute inset-x-0 bottom-0 h-[94%]">
                <Media
                  resource={portrait}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  imgClassName="!object-contain !object-bottom"
                />
              </div>
            </div>
            {name && (
              <div
                data-reveal="scale"
                style={{ '--i': 5 } as React.CSSProperties}
                className="absolute -bottom-5 start-6 rounded-2xl bg-white px-5 py-3 shadow-xl shadow-ink/10"
              >
                <p className="font-display font-bold text-ink">{name}</p>
                {role && <p className="text-sm">{role}</p>}
              </div>
            )}
          </div>
        )}

        <div
          data-reveal="end"
          className={portrait ? 'lg:col-span-7' : 'mx-auto max-w-3xl lg:col-span-12'}
        >
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <blockquote className="font-display text-2xl leading-snug font-semibold text-ink md:text-[2.1rem] md:leading-[1.35] [.section-dark_&]:text-white">
            {/* The key phrase gets a highlighter stroke once the section is on screen */}
            <QuoteLines text={quote} />
          </blockquote>
          {text && <p className="mt-6 text-lg leading-relaxed">{text}</p>}

          <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-current/10 pt-8">
            <div>
              <Signature
                image={signatureImage}
                text={signatureText}
                className={`h-20 text-6xl md:h-24 md:text-7xl ${dark ? 'text-white' : 'text-ink'}`}
              />
              {/* With a portrait the name is already on the photo badge (and in the signature). */}
              {(portrait ? role : name) && (
                <p className="mt-1 text-sm">
                  {!portrait && (
                    <span className={`font-semibold ${dark ? 'text-white' : 'text-ink'}`}>{name}</span>
                  )}
                  {!portrait && role && ' · '}
                  {role}
                </p>
              )}
            </div>
            {links && links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {links.map(({ id, link }) => (
                  <CMSLink key={id} link={link} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}

/**
 * Renders the quote with the editor's line breaks kept on larger screens; on
 * phones the lines are too long, so the text wraps naturally there instead.
 */
function QuoteLines({ text }: { text: string }) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim())
  return (
    <>
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <>
              <br className="max-md:hidden" />{' '}
            </>
          )}
          <Highlight text={line.trim()} className="marker" />
        </React.Fragment>
      ))}
    </>
  )
}
