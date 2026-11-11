import type { Metadata, Viewport } from 'next'
import { Gveret_Levin, Heebo, Rubik } from 'next/font/google'
import React from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { LeadTracking } from '@/components/LeadTracking'
import { RevealObserver } from '@/components/RevealObserver'
import { ScrollProgress } from '@/components/ScrollProgress'
import { SiteScripts } from '@/components/SiteScripts'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { getGlobal } from '@/utilities/payload'
import { getServerURL } from '@/utilities/routes'
import './globals.css'
import { BOOT } from './boot'

const heebo = Heebo({ subsets: ['hebrew', 'latin'], variable: '--font-heebo', display: 'swap' })
const rubik = Rubik({
  subsets: ['hebrew', 'latin'],
  variable: '--font-rubik',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})
// Hebrew handwriting for the founder's signature.
const signature = Gveret_Levin({
  subsets: ['hebrew', 'latin'],
  weight: '400',
  variable: '--font-signature-script',
  adjustFontFallback: false, // no metric overrides exist for this font
  display: 'swap',
})

/** Site-wide defaults; each page adds its own title, description, canonical and share card. */
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGlobal('site-settings', 0)
  const name = settings.siteName || 'REISS DIGITAL'
  const gsc = settings.integrations?.gscVerification?.trim()
  return {
    metadataBase: new URL(getServerURL()),
    applicationName: name,
    title: { default: name, template: settings.seo?.titleTemplate || `%s | ${name}` },
    description: settings.seo?.defaultDescription || undefined,
    formatDetection: { telephone: false, email: false, address: false },
    verification: gsc ? { google: gsc } : undefined,
  }
}

export const viewport: Viewport = { themeColor: '#0d1020' }

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Which analytics the one ID field loads, so events go the right way (src/utilities/track.ts).
  const id = (await getGlobal('site-settings', 0)).integrations?.ga4Id?.trim() ?? ''
  const analytics = /^GTM-[A-Z0-9]+$/i.test(id) ? 'gtm' : /^G-[A-Z0-9]+$/i.test(id) ? 'ga' : undefined

  return (
    // suppressHydrationWarning: the inline script adds the "js" class before React hydrates.
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${rubik.variable} ${signature.variable}`}
      data-analytics={analytics}
      suppressHydrationWarning
    >
      <head>
        {/* Scroll-reveal hides content only when JS runs; see boot.ts for what else runs
            here before hydration. */}
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-ink px-5 py-3 text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          דילוג לתוכן
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <RevealObserver />
        <ScrollProgress />
        <SiteScripts />
        <LeadTracking />
      </body>
    </html>
  )
}
