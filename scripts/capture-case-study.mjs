/**
 * Captures the screens a case study is built from (hero, a long desktop scroll,
 * mobile screens and detail views). Usage: node scripts/capture-case-study.mjs seaview
 * Output: src/seed/assets/<project>-cs-<name>.png
 */
import { chromium } from '@playwright/test'
import path from 'path'

import { capture } from './capture-screenshots.mjs'

const desktop = (screens) => ({ viewport: { width: 1440, height: 900 }, scale: 2, screens })
const mobile = (screens) => ({ viewport: { width: 390, height: 844 }, scale: 3, screens })
// A whole mobile page for the scrollable phone preview (2x keeps it under WebP's 16383px limit).
const mobilePage = { viewport: { width: 390, height: 844 }, scale: 2, screens: 9, unpin: true }

const projects = {
  seaview: {
    hero: ['https://seaviewpenthouse.co.il/he', desktop(1)],
    scroll: ['https://seaviewpenthouse.co.il/he', { ...desktop(4), scale: 1.5 }],
    'm-full': ['https://seaviewpenthouse.co.il/he', mobilePage],
    'm-availability': ['https://seaviewpenthouse.co.il/he/availability', mobile(1)],
    availability: ['https://seaviewpenthouse.co.il/he/availability', desktop(1)],
    en: ['https://seaviewpenthouse.co.il/en', desktop(1)],
    fr: ['https://seaviewpenthouse.co.il/fr', desktop(1)],
    shabbat: ['https://seaviewpenthouse.co.il/he/shabbat', desktop(1)],
  },
  hineni: { 'm-full': ['https://hineni.io', mobilePage] },
  'emuna-art': { 'm-full': ['https://omanut-emuna.com', mobilePage] },
}

const [, , name, only] = process.argv
const shots = projects[name]
if (!shots) {
  console.error(`Usage: node scripts/capture-case-study.mjs <${Object.keys(projects).join('|')}> [shot]`)
  process.exit(1)
}
const browser = await chromium.launch({ channel: 'msedge' })
for (const [key, [url, shot]] of Object.entries(shots)) {
  if (only && key !== only) continue
  await capture(browser, url, path.resolve('src/seed/assets', `${name}-cs-${key}.png`), shot)
}
await browser.close()
