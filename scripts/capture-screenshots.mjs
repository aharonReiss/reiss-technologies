/**
 * Captures desktop + mobile screenshots of a live site for the device showcase.
 * Usage: node scripts/capture-screenshots.mjs <url> <name>
 * Output: src/seed/assets/<name>-desktop.png, <name>-mobile.png
 * Uses the locally installed Microsoft Edge (no Playwright browser download needed).
 *
 * The desktop capture is tall (three screens) so the browser frame can scroll
 * through it. It is stitched from real viewport screenshots taken while
 * scrolling, so content that only appears when scrolled into view is captured
 * the way a visitor sees it.
 */
import { chromium } from '@playwright/test'
import path from 'path'
import { pathToFileURL } from 'url'
import sharp from 'sharp'

/**
 * One stitched capture: `screens` viewport heights from the top (all of the page
 * when omitted), at `scale` device pixels. Shared with capture-case-study.mjs.
 */
export async function capture(browser, url, file, shot) {
  const { width, height } = shot.viewport
  const page = await browser.newPage({ viewport: shot.viewport, deviceScaleFactor: shot.scale })
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })

  // Dismiss a cookie/consent banner if there is one.
  const consent = page.getByRole('button', { name: /^(קבלה|אישור|מסכים|אני מסכים|חיוניות בלבד|essential only|essentiels uniquement|אישור סטטיסטיקה|accept|accept all|agree|ok)$/i })
  if (await consent.count()) {
    await consent.first().click().catch(() => {})
    await page.waitForTimeout(500)
  }

  // Hide dev-only overlays (Next.js indicator) and stop smooth scrolling from lagging behind.
  await page.addStyleTag({
    content: 'nextjs-portal,[data-nextjs-toast]{display:none!important} html{scroll-behavior:auto!important}',
  })

  // A pinned section (sticky inside a tall track) would repeat across every slice of
  // its track: collapse the track to the section, so it appears once, in place.
  if (shot.unpin) {
    await page.evaluate(() => {
      for (const el of document.querySelectorAll('*')) {
        if (getComputedStyle(el).position !== 'sticky') continue
        const track = el.parentElement
        if (!track || el.offsetHeight < innerHeight * 0.3 || track.offsetHeight < el.offsetHeight * 1.3) continue
        el.style.setProperty('position', 'relative', 'important')
        track.style.setProperty('height', 'auto', 'important')
        track.style.setProperty('min-height', '0', 'important')
      }
    })
    await page.waitForTimeout(500)
  }

  // Warm-up pass: trigger lazy images and scroll-in content, then return to the top.
  const total = await page.evaluate(() => document.documentElement.scrollHeight)
  const target = Math.min(total, height * (shot.screens ?? Infinity))
  for (let y = 0; y < target; y += Math.round(height / 3)) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y)
    await page.waitForTimeout(250)
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.waitForTimeout(8000) // let hero entrance, fades and typewriter animations finish

  // Stitch viewport-sized slices taken at each scroll position.
  const slices = []
  for (let y = 0; y < target; y += height) {
    const top = Math.min(y, Math.max(0, total - height))
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), top)
    await page.waitForTimeout(y === 0 ? 300 : 3500) // wait for (staggered) scroll-in animations
    if (y > 0) {
      // Fixed/sticky chrome (header, chat buttons) must not repeat in every slice.
      await page.evaluate(() => {
        const hide = (root) => {
          for (const el of root.querySelectorAll('*')) {
            if (el.shadowRoot) hide(el.shadowRoot) // widgets often live in a shadow DOM
            const pos = getComputedStyle(el).position
            if (pos !== 'fixed' && pos !== 'sticky') continue
            // Only small chrome repeats; large fixed/sticky layers are page content
            // (backgrounds, pinned sections): keep them.
            const r = el.getBoundingClientRect()
            if (r.height >= innerHeight * 0.3) continue
            // opacity, not visibility: a child can override visibility and stay on screen.
            el.style.setProperty('transition', 'none', 'important')
            el.style.setProperty('opacity', '0', 'important')
          }
        }
        hide(document)
      })
    }
    // Settle crossfades (carousels, reveals) caught mid-transition.
    await page.evaluate(() =>
      document.getAnimations().forEach((a) => {
        try {
          if (a instanceof CSSTransition) a.finish()
        } catch {}
      }),
    )
    const sliceHeight = Math.min(height, target - y)
    const buffer = await page.screenshot({ clip: { x: 0, y: top === y ? 0 : y - top, width, height: sliceHeight } })
    slices.push({ input: buffer, top: y * shot.scale, left: 0 })
  }

    await sharp({
    create: { width: width * shot.scale, height: target * shot.scale, channels: 3, background: '#ffffff' },
  })
    .composite(slices)
    .png()
    .toFile(file)
  console.log('saved', file)
  await page.close()
}

const [, , url, name] = process.argv
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (!url || !name) {
    console.error('Usage: node scripts/capture-screenshots.mjs <url> <name>')
    process.exit(1)
  }
  const browser = await chromium.launch({ channel: 'msedge' })
  for (const shot of shots) await capture(browser, url, path.join(outDir, `${name}-${shot.suffix}.png`), shot)
  await browser.close()
}
