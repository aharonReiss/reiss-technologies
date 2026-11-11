/**
 * Analytics events. The site loads either Google Tag Manager or GA4 directly
 * (Site Settings → one ID field); `data-analytics` on <html> says which. With GTM
 * an event is a dataLayer push for a GTM trigger to pick up; with GA4 it is a
 * gtag event. Nothing is sent when neither is configured.
 */
type Params = Record<string, string | number | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined') return
  const mode = document.documentElement.dataset.analytics
  const data = { page_path: window.location.pathname, ...params }
  if (mode === 'gtm') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, ...data })
  } else if (mode === 'ga' && typeof window.gtag === 'function') {
    window.gtag('event', event, data)
  }
}

/** Where on the page a click happened, for the event's `link_location`. */
export function locationOf(el: Element): string {
  if (el.closest('[data-track-location]')) return (el.closest('[data-track-location]') as HTMLElement).dataset.trackLocation!
  if (el.closest('header')) return 'header'
  if (el.closest('footer')) return 'footer'
  return 'content'
}
