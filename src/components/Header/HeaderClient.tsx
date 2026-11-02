'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { CMSLink, resolveHref } from '@/components/CMSLink'
import { Icon } from '@/components/Icon'
import { Logo } from '@/components/Logo'
import type { Header, Media } from '@/payload-types'
import { cn } from '@/utilities/cn'

type Props = {
  navItems: NonNullable<Header['navItems']>
  cta?: Header['cta']
  siteName: string
  logo: Media | null
  phone?: string | null
}

export function HeaderClient({ navItems, cta, siteName, logo, phone }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // Slides away while reading downwards, returns as soon as the visitor scrolls up.
  const [tucked, setTucked] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      if (Math.abs(y - lastY) > 6) {
        setTucked(y > lastY && y > 480)
        lastY = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const isActive = (href: string | null) =>
    Boolean(href && href !== '/' && pathname.startsWith(href))

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 motion-reduce:transition-none',
        tucked && !open && '-translate-y-full',
        // Dark bar that flows into the dark hero; a touch of glass + shadow once scrolled.
        'border-b border-white/10 bg-ink',
        (scrolled || open) && 'bg-ink/90 shadow-lg shadow-black/20 backdrop-blur-lg',
      )}
    >
      <div className="container-site flex h-[72px] items-center justify-between gap-6">
        <Link href="/" aria-label={`${siteName}, דף הבית`} className="shrink-0">
          <Logo logo={logo} siteName={siteName} inverted />
        </Link>

        <nav aria-label="ניווט ראשי" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const href = resolveHref(item.link)
              const children = item.children ?? []
              return (
                <li key={item.id} className="group relative">
                  <CMSLink
                    link={item.link}
                    appearance="none"
                    className={cn(
                      'flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-medium text-white/80 transition hover:bg-white/10 hover:text-white',
                      isActive(href) && 'bg-white/10 text-white',
                    )}
                  >
                    {item.link.label}
                    {children.length > 0 && <Icon name="chevron" className="size-4" />}
                  </CMSLink>
                  {children.length > 0 && (
                    <div className="invisible absolute start-0 top-full pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <ul className="min-w-56 rounded-2xl border border-white/10 bg-ink-soft p-2 shadow-2xl shadow-black/40">
                        {children.map((child) => (
                          <li key={child.id}>
                            <CMSLink
                              link={child.link}
                              appearance="none"
                              className="block rounded-xl px-4 py-2.5 text-[15px] text-white/80 hover:bg-white/10 hover:text-white"
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {phone && (
            <a
              href={`tel:${phone.replace(/[^\d+]/g, '')}`}
              className="hidden items-center gap-2 text-[15px] font-semibold text-white/90 transition hover:text-white xl:flex"
            >
              <Icon name="phone" className="size-4" />
              <span dir="ltr">{phone}</span>
            </a>
          )}
          {cta && resolveHref(cta) && (
            <CMSLink link={cta} appearance="none" className="btn-accent hidden !py-2.5 sm:inline-flex" />
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'סגירת תפריט' : 'פתיחת תפריט'}
            className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/10 bg-ink lg:hidden"
      >
        <nav aria-label="ניווט ראשי" className="container-site py-6">
          <ul className="divide-y divide-white/10">
            {navItems.map((item) => (
              <li key={item.id} className="py-1">
                <CMSLink
                  link={item.link}
                  appearance="none"
                  className="block py-3 font-display text-2xl font-semibold text-white"
                />
                {(item.children ?? []).length > 0 && (
                  <ul className="mb-3 space-y-1 ps-4">
                    {item.children!.map((child) => (
                      <li key={child.id}>
                        <CMSLink
                          link={child.link}
                          appearance="none"
                          className="block py-1.5 text-lg text-white/60"
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          {cta && <CMSLink link={cta} appearance="none" className="btn-accent mt-8 w-full" />}
        </nav>
      </div>
    </header>
  )
}
