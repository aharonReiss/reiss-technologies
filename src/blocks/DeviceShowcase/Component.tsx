import React from 'react'

import { CMSLink } from '@/components/CMSLink'
import { DeviceShowcase } from '@/components/DeviceShowcase'
import { Icon } from '@/components/Icon'
import { Eyebrow, Highlight, Section } from '@/components/Section'
import type { DeviceShowcaseBlock as DeviceShowcaseBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'

export function DeviceShowcaseBlock({
  source,
  project,
  desktop,
  mobile,
  url,
  badge,
  eyebrow,
  heading,
  text,
  bullets,
  links,
  devicesPosition,
  background,
  anchor,
}: DeviceShowcaseBlockProps) {
  const fromProject = source !== 'custom' && project && typeof project === 'object' ? project : null
  const shots = fromProject
    ? {
        desktop: fromProject.desktopScreenshot,
        mobile: fromProject.mobileScreenshot,
        url: fromProject.websiteUrl,
      }
    : { desktop, mobile, url }

  const hasText = Boolean(eyebrow || heading || text || bullets?.length || links?.length)

  return (
    <Section background={background} anchor={anchor}>
      <div
        className={cn(
          'grid items-center gap-12',
          hasText && 'lg:grid-cols-12 lg:gap-16',
        )}
      >
        {hasText && (
          <div data-reveal="start" className={cn('lg:col-span-5', devicesPosition === 'start' && 'lg:order-2')}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {heading && (
              <h2 className="text-3xl leading-tight font-bold md:text-[2.75rem]">
                <Highlight text={heading} />
              </h2>
            )}
            {text && <p className="mt-5 text-lg leading-relaxed">{text}</p>}
            {bullets && bullets.length > 0 && (
              <ul className="mt-8 space-y-3">
                {bullets.map((b) => (
                  <li key={b.id} className="flex items-start gap-3 text-ink [.section-dark_&]:text-white">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand text-white">
                      <Icon name="check" className="size-3.5" strokeWidth={3} />
                    </span>
                    {b.text}
                  </li>
                ))}
              </ul>
            )}
            {links && links.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-3">
                {links.map(({ id, link }) => (
                  <CMSLink key={id} link={link} />
                ))}
              </div>
            )}
          </div>
        )}
        <div className={cn(hasText ? 'lg:col-span-7' : 'mx-auto w-full max-w-5xl')}>
          <DeviceShowcase {...shots} badge={badge} />
        </div>
      </div>
    </Section>
  )
}
