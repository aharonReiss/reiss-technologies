import { chromium } from '@playwright/test'
const out = process.argv[2]
const b = await chromium.launch({ channel: 'msedge' })
for (const w of [1440, 390]) {
  const h = w > 500 ? 900 : 844
  const p = await b.newPage({ viewport: { width: w, height: h } })
  await p.goto('http://localhost:3020/about', { waitUntil: 'load', timeout: 120000 })
  await p.waitForTimeout(5000)
  const H = await p.evaluate(() => document.documentElement.scrollHeight)
  console.log(w, 'height', H, 'overflow', await p.evaluate(() => document.documentElement.scrollWidth - innerWidth))
  for (let i = 0, y = 0; y < H && i < 16; i++, y += h * 0.7) {
    await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(600)
    await p.screenshot({ path: `${out}/a${w}-${String(i).padStart(2,'0')}.png` })
  }
  await p.close()
}
await b.close()
