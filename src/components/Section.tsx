import React from 'react'

import { cn } from '@/utilities/cn'

export type SectionBackground = 'light' | 'muted' | 'dark'

const backgrounds: Record<SectionBackground, string> = {
  light: 'bg-muted',
  muted: 'bg-muted',
  dark: 'section-dark bg-ink text-white/70 [&_h2]:text-white [&_h3]:text-white',
}

type Props = {
  background?: SectionBackground | null
  anchor?: string | null
  className?: string
  children: React.ReactNode
}

export function Section({ background, anchor, className, children }: Props) {
  return (
    <section
      id={anchor || undefined}
      className={cn('py-20 md:py-28', backgrounds[background ?? 'light'], className)}
    >
      <div className="container-site">{children}</div>
    </section>
  )
}

type HeaderProps = {
  eyebrow?: string | null
  heading?: string | null
  intro?: string | null
  align?: 'start' | 'center'
  className?: string
  children?: React.ReactNode
}

export function SectionHeader({
  eyebrow,
  heading,
  intro,
  align = 'start',
  className,
  children,
}: HeaderProps) {
  if (!eyebrow && !heading && !intro) return null
  return (
    <div
      data-reveal
      className={cn(
        'mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'items-center text-center md:flex-col md:items-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {heading && (
          <h2 className="text-3xl leading-tight font-bold md:text-[2.75rem]">
            <Highlight text={heading} />
          </h2>
        )}
        {intro && <p className="mt-5 text-lg leading-relaxed">{intro}</p>}
      </div>
      {children}
    </div>
  )
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'mb-4 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-brand',
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {children}
    </span>
  )
}

/**
 * Same output as <Highlight>, but every word rises in on page load, one after
 * another. For above-the-fold headings only (it plays immediately).
 */
export function RiseWords({
  text,
  highlightClassName,
  baseDelayMs = 0,
}: {
  text: string
  highlightClassName?: string
  baseDelayMs?: number
}) {
  let index = 0
  const parts = text.split(/\*([^*]+)\*/g)
  return (
    <>
      {parts.map((part, p) =>
        part.split(/(\s+)/).map((word, w) => {
          if (!word) return null
          if (/^\s+$/.test(word)) return <React.Fragment key={`${p}-${w}`}>{word}</React.Fragment>
          const style = { '--i': index++, '--base': `${baseDelayMs}ms` } as React.CSSProperties
          return (
            <span
              key={`${p}-${w}`}
              style={style}
              className={cn('rise-in inline-block', p % 2 === 1 && cn('text-brand', highlightClassName))}
            >
              {word}
            </span>
          )
        }),
      )}
    </>
  )
}

/** Renders `*words*` from CMS text in the brand highlight style. */
export function Highlight({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/\*([^*]+)\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className={cn('text-brand', className)}>
            {part}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  )
}
