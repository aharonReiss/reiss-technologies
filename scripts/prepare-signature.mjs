/**
 * Turns a scanned/photographed signature (dark ink on a light background) into a
 * tightly-cropped black PNG with a transparent background, ready to upload as
 * "צילום חתימה אמיתית". Ink darkness becomes opacity, so edges stay smooth.
 *
 * Usage: node scripts/prepare-signature.mjs <input> <output.png>
 */
import sharp from 'sharp'

const [, , input, output] = process.argv
if (!input || !output) {
  console.error('Usage: node scripts/prepare-signature.mjs <input> <output.png>')
  process.exit(1)
}

const { data, info } = await sharp(input)
  .flatten({ background: '#ffffff' })
  .greyscale()
  .raw()
  .toBuffer({ resolveWithObject: true })

const { width, height } = info
const rgba = Buffer.alloc(width * height * 4)
for (let i = 0; i < width * height; i++) {
  // Ignore paper noise below ~10% darkness, then stretch the rest to full opacity.
  const ink = Math.max(0, 255 - data[i] - 25) / 230
  rgba[i * 4 + 3] = Math.round(Math.min(1, ink) * 255)
}

const out = await sharp(rgba, { raw: { width, height, channels: 4 } })
  .trim({ threshold: 1 })
  .extend({ top: 8, bottom: 8, left: 8, right: 8, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(output)

console.log(`saved ${output} (${out.width}×${out.height})`)
