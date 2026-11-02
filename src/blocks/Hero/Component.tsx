import React from 'react'

import { CMSLink } from '@/components/CMSLink'
import { Icon } from '@/components/Icon'
import { Media } from '@/components/Media'
import { Eyebrow, Highlight, RiseWords } from '@/components/Section'
import { Signature } from '@/components/Signature'
import type { HeroBlock as HeroBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'

export function HeroBlock(props: HeroBlockProps) {
  if (props.variant === 'personal') return <PersonalHero {...props} />
  return props.variant === 'home' ? <HomeHero {...props} /> : <PageHero {...props} />
}

function PersonalHero({
  eyebrow,
  heading,
  subheading,
  links,
  portrait,
  signatureText,
  signatureImage,
  floatingTestimonial,
  proof,
  bubbles,
  growWord,
}: HeroBlockProps) {
  if (!portrait) {
    return (
      <CenteredHero
        eyebrow={eyebrow}
        heading={heading}
        subheading={subheading}
        links={links}
        growWord={growWord}
      />
    )
  }

  const testimonial =
    floatingTestimonial && typeof floatingTestimonial === 'object' ? floatingTestimonial : null
  // Bubbles float around the portrait; the testimonial is the fallback when none are set.
  const bubbleTexts = (bubbles ?? []).map((b) => b.text)
  if (bubbleTexts.length === 0 && testimonial) bubbleTexts.push(`״${testimonial.quote}״ (**${testimonial.name}**)`)

  return (
    // Full-width dark band that continues the dark header (starts right below it).
    <section className="section-dark relative isolate mt-[72px] overflow-hidden bg-ink text-white/70">
      <HeroBackdrop />
      <div className="container-site grid grid-cols-1 items-center lg:min-h-[calc(92svh-72px)] lg:grid-cols-12 lg:gap-6">
        {/* Text: right side in RTL */}
        <div className="relative z-10 pt-14 pb-4 md:pt-20 lg:col-span-6 lg:py-24">
          {eyebrow && (
            <Eyebrow className="rise-in w-fit rounded-full border border-white/15 bg-white/5 px-4 py-1.5 !text-white/90 backdrop-blur">
              {eyebrow}
            </Eyebrow>
          )}
          <h1 className="text-[2.6rem] leading-[1.08] font-extrabold tracking-tight !text-white md:text-6xl xl:text-7xl">
            <RiseWords text={heading} highlightClassName="!text-brand" baseDelayMs={150} />
          </h1>
          {subheading && (
            <p
              className="rise-in mt-7 max-w-xl text-lg leading-relaxed md:text-xl"
              style={{ '--base': '950ms' } as React.CSSProperties}
            >
              {subheading}
            </p>
          )}
          {links && links.length > 0 && (
            <div
              className="rise-in mt-10 flex flex-wrap gap-3"
              style={{ '--base': '1250ms' } as React.CSSProperties}
            >
              {links.map(({ id, link }, i) => (
                <CMSLink
                  key={id}
                  link={link}
                  appearance={i === 0 ? 'none' : 'secondary'}
                  className={i === 0 ? 'btn-accent' : 'text-white'}
                />
              ))}
            </div>
          )}
          <Signature
            image={signatureImage}
            text={signatureText}
            startDelayMs={1550}
            className="mt-10 h-16 text-5xl text-white/90 md:h-20 md:text-6xl"
          />
        </div>

        {/* Portrait: left side, anchored to the bottom edge of the band */}
        <div className="relative h-[480px] self-end sm:h-[580px] lg:col-span-6 lg:h-[calc(92svh-72px)] lg:max-h-[760px] lg:min-h-[600px]">
          <div
            aria-hidden
            className="absolute bottom-[-12%] left-1/2 size-[85%] max-w-[600px] -translate-x-1/2"
          >
            <div className="size-full animate-glow rounded-full bg-brand/45 blur-3xl motion-reduce:animate-none" />
          </div>
          <div
            className="rise-in absolute inset-x-0 bottom-0 mx-auto h-[94%] max-w-[580px]"
            style={{ '--base': '300ms' } as React.CSSProperties}
          >
            <Media
              resource={portrait}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 95vw"
              imgClassName="!object-contain !object-bottom"
            />
          </div>
          {bubbleTexts.slice(0, 3).map((text, i) => (
            <div key={i} className={cn('absolute z-10 max-w-[72%] sm:max-w-none sm:whitespace-nowrap', bubblePositions[i])}>
              <div
                className="rise-in"
                style={{ '--base': `${1900 + i * 350}ms` } as React.CSSProperties}
              >
                {/* Dark glass so the text stays readable over the white shirt */}
                <p
                  className="flex animate-float items-center gap-2.5 rounded-full border border-white/15 bg-ink/75 py-2.5 ps-2.5 pe-4 text-[13px] leading-snug text-white/85 shadow-2xl shadow-black/40 backdrop-blur-xl motion-reduce:animate-none sm:pe-5 sm:text-[15px]"
                  style={{ animationDelay: `${-i * 2}s` }}
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand text-white sm:size-7">
                    <Icon name="check" className="size-3.5" strokeWidth={3} />
                  </span>
                  <span>
                    <BoldText text={text} />
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Bubble spots around the portrait (RTL: start = right, toward the text). */
const bubblePositions = [
  'top-[64%] start-0 sm:start-[2%] sm:top-[67%]', // below the face, between the other two
  'top-[50%] end-0 sm:end-[2%]',
  'bottom-[10%] start-[6%] sm:start-[12%]',
]

/** `**bold**` segments in short CMS strings. */
function BoldText({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*([^*]+)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-bold text-white">
            {part}
          </strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  )
}

/** Brand glow, diagonal light beams and a few sparkles behind the dark heroes. */
function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {/* Glows breathe and light beams drift slowly – motion without distraction */}
      <div className="absolute -top-1/3 left-[-10%] size-[70%] animate-glow rounded-full bg-brand/45 blur-[120px] motion-reduce:animate-none" />
      <div className="absolute right-[-10%] bottom-[-30%] size-[60%] animate-glow rounded-full bg-brand-dark/50 blur-[120px] [animation-delay:-3.5s] motion-reduce:animate-none" />
      <div className="absolute top-[-20%] left-[18%] h-[150%] w-24 rotate-[24deg] animate-drift bg-gradient-to-b from-brand/50 to-transparent motion-reduce:animate-none md:w-40" />
      <div className="absolute top-[-20%] left-[38%] h-[150%] w-10 rotate-[24deg] animate-drift-slow bg-gradient-to-b from-white/10 to-transparent motion-reduce:animate-none md:w-16" />
      {[
        ['12%', '18%'],
        ['70%', '12%'],
        ['85%', '62%'],
        ['30%', '80%'],
        ['55%', '40%'],
      ].map(([l, t], i) => (
        <span
          key={l + t}
          className="absolute size-1.5 animate-pulse rounded-full bg-white/70 shadow-[0_0_12px_4px_rgb(67_85_245/0.6)] motion-reduce:animate-none"
          style={{ left: l, top: t, animationDelay: `${i * 0.7}s`, animationDuration: '3s' }}
        />
      ))}
    </div>
  )
}

/**
 * Statement hero (no portrait): the headline is the visual. One word of it –
 * `growWord` – is set at display scale and grows out of a baseline on load.
 * Without a grow word the headline falls back to a large, plain statement.
 */
function CenteredHero({
  eyebrow,
  heading,
  subheading,
  links,
  growWord,
}: Pick<HeroBlockProps, 'eyebrow' | 'heading' | 'subheading' | 'links' | 'growWord'>) {
  const plain = heading.replace(/\*/g, '').trim()
  const word = growWord?.trim()
  const at = word ? plain.indexOf(word) : -1

  // "לא רק אתר שנראה טוב, אתר שהעסק | צומח | איתו" → lead, strong, word, tail
  const before = at >= 0 ? plain.slice(0, at).trim() : plain
  const comma = before.indexOf(',')
  const lead = comma >= 0 ? before.slice(0, comma + 1) : ''
  const strong = comma >= 0 ? before.slice(comma + 1).trim() : before
  const tail = at >= 0 ? plain.slice(at + word!.length).trim().replace(/\.$/, '') : ''

  const primary = links?.[0]
  const secondary = links?.[1]

  // Entrance timing (ms). Everything starts at once: no blank opening frame.
  const T = { lead: 0, strong: 60, word: 120, letterStep: 70, tail: 380, dot: 620, rule: 200, foot: 650 }
  const fast = (ms: number) => ({ '--base': `${ms}ms`, animationDuration: '0.7s' }) as React.CSSProperties

  return (
    // Starts below the fixed header. No exit effect: the next section cuts in cleanly.
    <section
      className="section-dark relative isolate mt-[72px] overflow-hidden bg-ink text-white/70"
    >
      <div className="container-site flex flex-col pt-8 pb-10 md:min-h-[calc(100svh-72px)] md:justify-center md:py-12">
        {eyebrow && (
          <p className="rise-in m-0 mb-5 font-sans text-sm font-semibold tracking-wide text-white/55 md:mb-7" style={fast(0)}>
            {eyebrow}
          </p>
        )}
        <h1 className="m-0 !text-white">
          {lead && (
            <span
              className="rise-in block font-display text-[clamp(1.6rem,4.4vw,4rem)] leading-[1.1] font-medium tracking-tight text-white/45"
              style={fast(T.lead)}
            >
              {lead}
            </span>
          )}
          <span
            className="rise-in relative top-[4.6vw] mt-1 block font-display text-[clamp(1.6rem,4.4vw,4rem)] leading-[1.1] font-extrabold tracking-tight text-white md:top-0"
            style={fast(T.strong)}
          >
            {at >= 0 ? strong : plain}
          </span>

          {at >= 0 && (
            <span className="mt-2 flex flex-wrap items-baseline gap-x-[0.18em] md:mt-0">
              <span
                aria-hidden
                className="type-display text-[40vw] whitespace-nowrap text-white md:text-[min(25vw,23rem,36svh)]"
              >
                {Array.from(word!).map((ch, i) => (
                  <span
                    key={i}
                    className="grow-letter"
                    style={{ animationDelay: `${T.word + i * T.letterStep}ms` }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
              {/* Screen readers get the word once, as plain text */}
              <span className="sr-only">{word}</span>
              {tail && (
                <span
                  className="rise-in type-display text-[22vw] whitespace-nowrap text-brand md:text-[min(11vw,10rem,16svh)]"
                  style={fast(T.tail)}
                >
                  {tail}
                  <span className="dot-land" style={{ '--base': `${T.dot}ms` } as React.CSSProperties}>
                    .
                  </span>
                </span>
              )}
            </span>
          )}
        </h1>

        {/* The foot sits directly under the display line, so headline and actions read as one unit */}
        <div className="mt-5 md:mt-12">
          <div aria-hidden className="baseline-draw h-px bg-white/20" style={{ '--base': `${T.rule}ms` } as React.CSSProperties} />
          <div
            className="rise-in grid gap-6 pt-6 md:grid-cols-[minmax(0,29rem)_1fr] md:items-end md:gap-12 md:pt-8"
            style={fast(T.foot)}
          >
            {subheading && (
              <p className="m-0 max-w-[36ch] text-[17px] leading-[1.7] text-white/90 md:max-w-none md:text-lg md:leading-relaxed">
                {subheading}
              </p>
            )}
            <div data-wa-avoid className="flex flex-wrap items-center gap-x-8 gap-y-4 md:justify-end">
              {primary && (
                <CMSLink
                  link={primary.link}
                  appearance="none"
                  className="btn-accent !h-14 w-full !px-8 !text-base sm:w-auto md:order-2 md:!text-lg"
                />
              )}
              {secondary && (
                <CMSLink
                  link={secondary.link}
                  appearance="none"
                  className="border-b-2 border-brand pb-1 font-display text-lg font-bold text-white transition hover:border-white md:order-1 md:text-xl"
                >
                  {secondary.link.label} ←
                </CMSLink>
              )}
              <span
                dir="ltr"
                aria-hidden
                className="hidden font-display text-xs font-medium tracking-[0.24em] text-white/40 md:order-3 lg:block"
              >
                SCROLL ↓
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HomeHero({ eyebrow, heading, subheading, links, image, highlights }: HeroBlockProps) {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      {/* Decorative grid + glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)] bg-[size:56px_56px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[42rem] -translate-x-1/2 rounded-full bg-brand/15 blur-3xl"
      />

      <div className="container-site grid items-center gap-14 lg:grid-cols-12">
        <div className={image ? 'lg:col-span-7' : 'mx-auto max-w-4xl text-center lg:col-span-12'}>
          {eyebrow && (
            <Eyebrow className="rounded-full border border-line bg-white px-4 py-1.5 shadow-sm">
              {eyebrow}
            </Eyebrow>
          )}
          <h1 className="text-[2.6rem] leading-[1.08] font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            <Highlight text={heading} />
          </h1>
          {subheading && (
            <p
              className={`mt-7 max-w-2xl text-lg leading-relaxed md:text-xl ${image ? '' : 'mx-auto'}`}
            >
              {subheading}
            </p>
          )}
          {links && links.length > 0 && (
            <div className={`mt-10 flex flex-wrap gap-3 ${image ? '' : 'justify-center'}`}>
              {links.map(({ id, link }) => (
                <CMSLink key={id} link={link} className="text-ink" />
              ))}
            </div>
          )}
          {highlights && highlights.length > 0 && (
            <ul
              className={`mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[15px] font-medium text-ink ${image ? '' : 'justify-center'}`}
            >
              {highlights.map((h) => (
                <li key={h.id} className="flex items-center gap-2">
                  <span className="grid size-5 place-items-center rounded-full bg-brand text-white">
                    <Icon name="check" className="size-3" strokeWidth={3} />
                  </span>
                  {h.text}
                </li>
              ))}
            </ul>
          )}
        </div>
        {image && (
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/15">
              <Media resource={image} fill priority sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
            <div className="absolute -start-6 -bottom-6 hidden rounded-2xl bg-ink p-5 text-white shadow-xl md:block">
              <div className="flex gap-0.5 text-white">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" className="size-4" />
                ))}
              </div>
              <p className="mt-2 text-sm text-white/70">לקוחות מרוצים ממליצים</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function PageHero({ eyebrow, heading, subheading, links, image }: HeroBlockProps) {
  return (
    <section className="relative overflow-hidden bg-muted pt-36 pb-16 md:pt-44 md:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 end-0 -z-0 size-96 rounded-full bg-brand/10 blur-3xl"
      />
      <div className="container-site relative grid items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="text-4xl leading-tight font-extrabold tracking-tight md:text-6xl">
            <RiseWords text={heading} baseDelayMs={80} />
          </h1>
          {subheading && (
            <p
              className="rise-in mt-6 max-w-2xl text-lg leading-relaxed md:text-xl"
              style={{ '--base': '550ms' } as React.CSSProperties}
            >
              {subheading}
            </p>
          )}
          {links && links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {links.map(({ id, link }) => (
                <CMSLink key={id} link={link} className="text-ink" />
              ))}
            </div>
          )}
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-card lg:col-span-4">
            <Media resource={image} fill priority sizes="(min-width: 1024px) 33vw, 100vw" />
          </div>
        )}
      </div>
    </section>
  )
}
