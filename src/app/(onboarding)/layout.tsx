import type { Metadata, Viewport } from 'next'
import { Heebo, Rubik } from 'next/font/google'
import React from 'react'

import '../(frontend)/globals.css'

const heebo = Heebo({ subsets: ['hebrew', 'latin'], variable: '--font-heebo', display: 'swap' })
const rubik = Rubik({
  subsets: ['hebrew', 'latin'],
  variable: '--font-rubik',
  weight: ['400', '500', '700', '800', '900'],
  display: 'swap',
})

/**
 * Client questionnaires: private pages, one per client link. A quiet shell of
 * their own, without the site's menu, analytics or widgets, never indexed.
 */
export const metadata: Metadata = {
  title: 'שאלון אפיון | REISS DIGITAL',
  robots: { index: false, follow: false, nocache: true },
  referrer: 'no-referrer',
}

export const viewport: Viewport = { themeColor: '#0d1020' }

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${rubik.variable}`}>
      <body className="min-h-svh bg-muted text-ink">{children}</body>
    </html>
  )
}
