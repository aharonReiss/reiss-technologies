import React from 'react'

import { Section, SectionHeader } from '@/components/Section'
import type { ProcessStepsBlock as ProcessStepsBlockProps } from '@/payload-types'
import { ProcessTimeline } from './Timeline'

export function ProcessStepsBlock({
  variant,
  eyebrow,
  heading,
  intro,
  steps,
  outro,
  background,
  anchor,
}: ProcessStepsBlockProps) {
  const dark = background === 'dark'
  if (variant === 'timeline') {
    return (
      <section id={anchor || undefined} className={dark ? 'section-dark bg-ink text-white/70' : 'bg-muted text-ink'}>
        <ProcessTimeline heading={heading} intro={intro} steps={steps ?? []} outro={outro} dark={dark} />
      </section>
    )
  }
  if (variant === 'row') {
    // Compact: one row of numbered steps on desktop, a short list on phones, no scroll effects.
    const list = steps ?? []
    return (
      <section id={anchor || undefined} className={dark ? 'section-dark bg-ink text-white/70' : 'bg-muted text-ink'}>
        <div className="container-site py-16 md:py-[12vh]">
          {heading && (
            <h2 className="m-0 font-display text-[clamp(2.3rem,10vw,3.2rem)] leading-[1] font-black tracking-[-0.04em] md:text-[min(5vw,9svh,4.8rem)]">
              {heading.replace(/[.?]$/, '')}
              <span className="text-brand">{/[?]$/.test(heading) ? '?' : '.'}</span>
            </h2>
          )}
          {intro && <p className="mt-4 mb-0 max-w-[44ch] text-[1.0625rem] leading-[1.7] text-body md:text-xl">{intro}</p>}
          <ol className="relative m-0 mt-10 grid list-none gap-0 p-0 md:mt-[7vh] md:grid-cols-4 md:gap-8">
            {list.map((step, i) => (
              <li
                key={step.id ?? i}
                data-reveal
                style={{ '--i': i } as React.CSSProperties}
                className="relative border-s border-current/15 ps-6 pb-8 last:pb-0 md:border-s-0 md:border-t md:ps-0 md:pt-6 md:pb-0"
              >
                {/* The step's dot sits on the line: the side line on phones, the top line on desktop. */}
                <span aria-hidden className="absolute top-1.5 -start-[5px] size-2.5 rounded-full bg-brand md:-top-[5px] md:start-0" />
                <span dir="ltr" className="font-display text-sm font-bold tracking-[0.12em] text-brand">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 mb-0 font-display text-xl font-extrabold tracking-tight md:text-2xl">{step.title}</h3>
                {step.description && (
                  <p className="mt-2 mb-0 max-w-[30ch] text-[0.95rem] leading-[1.6] text-body md:text-base">{step.description}</p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>
    )
  }
  return (
    <Section background={background} anchor={anchor}>
      <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro} />
      {/* Once on screen: the progress line fills and the step numbers light up in order */}
      <div data-reveal="none">
        <div aria-hidden className="mb-6 h-1 overflow-hidden rounded-full bg-current/10">
          <div className="process-fill h-full rounded-full bg-brand" />
        </div>
        <ol className="grid gap-px overflow-hidden rounded-card border border-current/10 bg-current/10 md:grid-cols-2 lg:grid-cols-4">
          {(steps ?? []).map((step, i) => (
            <li
              key={step.id}
              className={`group relative p-8 transition ${dark ? 'bg-ink hover:bg-ink-soft' : 'bg-white hover:bg-muted'}`}
            >
              <div data-reveal style={{ '--i': i } as React.CSSProperties}>
                <span
                  dir="ltr"
                  style={{ '--i': i } as React.CSSProperties}
                  className="process-num mb-12 block font-display text-5xl font-bold text-transparent transition-colors duration-700 [-webkit-text-stroke:1.5px_var(--color-brand)] group-hover:text-brand"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                {step.description && <p className="leading-relaxed">{step.description}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
