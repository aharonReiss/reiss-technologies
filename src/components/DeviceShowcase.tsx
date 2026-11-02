import React from 'react'

import { Media } from '@/components/Media'
import type { Media as MediaDoc } from '@/payload-types'
import { cn } from '@/utilities/cn'

type Props = {
  desktop?: MediaDoc | number | null
  mobile?: MediaDoc | number | null
  url?: string | null
  badge?: string | null
  /** Sits on a Deep Navy section: navy surfaces instead of Cool White. */
  dark?: boolean
  className?: string
}

const displayUrl = (url?: string | null) => {
  if (!url) return null
  return /^https?:\/\//.test(url) ? url : `https://${url}`
}

/**
 * A live-site screenshot inside a tilted browser window, with a phone in front.
 * Once on screen both captures scroll slowly through the site (also on touch
 * devices, which have no hover); hovering straightens the browser.
 */
export function DeviceShowcase({ desktop, mobile, url, badge, dark, className }: Props) {
  if (!desktop && !mobile) return null
  const href = displayUrl(url)

  return (
    <div
      data-reveal="scale"
      className={cn(
        'group/showcase relative rounded-[2rem] border p-3 md:p-5',
        dark
          ? 'border-white/10 bg-ink-soft'
          : 'border-line/70 bg-muted shadow-[0_40px_80px_-40px_rgb(11_13_23/0.25)]',
        className,
      )}
    >
      {/* Flat palette surface: the screenshots carry the colour. */}
      <div
        className={cn(
          'relative overflow-hidden rounded-[1.6rem] border px-[6%] pt-[12%] pb-[8%] [perspective:1800px]',
          dark ? 'border-white/10 bg-ink' : 'border-line bg-muted',
        )}
      >

        {badge && (
          <span className="absolute start-[5%] top-[4%] z-20 rounded-full border border-line bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-ink shadow-md backdrop-blur md:text-sm">
            {badge}
          </span>
        )}

        {/* Browser */}
        {desktop && (
          <div className="relative me-[14%] origin-right transition-transform duration-700 ease-out [transform:rotateY(-16deg)_rotateX(6deg)_rotateZ(-1.5deg)] group-hover/showcase:[transform:rotateY(-6deg)_rotateX(2deg)_rotateZ(0deg)] motion-reduce:transition-none">
            <div className="overflow-hidden rounded-xl border border-black/5 bg-white shadow-[0_30px_60px_-20px_rgb(11_13_23/0.35)] md:rounded-2xl">
              <div dir="ltr" className="flex items-center gap-3 border-b border-line bg-muted/80 px-3 py-2 md:px-4 md:py-2.5">
                <span className="hidden flex-1 justify-center sm:flex">
                  {href && (
                    <span className="max-w-full truncate rounded-full bg-white px-4 py-1 text-[11px] font-medium text-body shadow-inner shadow-black/5 md:text-xs">
                      {href}
                    </span>
                  )}
                </span>
                <span className="ms-auto flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                </span>
              </div>
              {/* Viewport with 16:10 ratio; the full-page capture scrolls inside it. */}
              <div className="relative aspect-[16/10] overflow-hidden [container-type:size]">
                <Media
                  resource={desktop}
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  imgClassName="screen-scroll absolute inset-x-0 top-0 [--scroll-duration:18s]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Phone */}
        {mobile && (
          <div
            className={cn(
              'z-10 w-[30%] min-w-28 animate-float motion-reduce:animate-none',
              desktop ? 'absolute end-[4%] bottom-[5%]' : 'relative mx-auto',
            )}
          >
            <div
              data-reveal
              style={{ '--i': 4 } as React.CSSProperties}
              className="rounded-[1.4rem] bg-ink p-[5%] shadow-[0_30px_50px_-15px_rgb(11_13_23/0.55)] ring-1 ring-white/10 md:rounded-[2.2rem]"
            >
              <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1rem] bg-white [container-type:size] md:rounded-[1.75rem]">
                <span
                  aria-hidden
                  className="absolute top-[2.5%] left-1/2 z-10 h-[3.5%] w-[34%] -translate-x-1/2 rounded-full bg-ink"
                />
                <Media
                  resource={mobile}
                  sizes="(min-width: 1024px) 15vw, 30vw"
                  imgClassName="screen-scroll absolute inset-x-0 top-0 [--scroll-duration:13s]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
