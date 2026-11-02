import path from 'path'
import sharp from 'sharp'

/** One pen stroke of a signature, positioned in % of the whole signature box. */
export type SignatureStroke = {
  left: number
  top: number
  width: number
  height: number
  /** Cropped transparent PNG containing only this stroke's ink. */
  src: string
  /** Horizontal strokes are written right-to-left, tall ones top-down. */
  direction: 'rtl' | 'down'
  durationMs: number
  delayMs: number
}

export type SignatureStrokes = { aspectRatio: number; strokes: SignatureStroke[] }

const WORK_WIDTH = 600 // enough for a crisp ~120px-tall signature on 2x screens
const INK_ALPHA = 20 // include anti-aliased edges in the stroke they belong to
const PEN_LIFT_MS = 30

const cache = new Map<string, Promise<SignatureStrokes | null>>()

/**
 * Splits an uploaded transparent signature into its connected ink strokes,
 * ordered the way Hebrew is written (right to left), with timings for a
 * natural writing speed. Results are cached per file version.
 */
export function getSignatureStrokes(filename: string, version = ''): Promise<SignatureStrokes | null> {
  const key = `${filename}:${version}`
  if (!cache.has(key)) cache.set(key, computeStrokes(filename).catch(() => null))
  return cache.get(key)!
}

async function computeStrokes(filename: string): Promise<SignatureStrokes | null> {
  const file = path.join(process.cwd(), 'media', path.basename(filename))
  const { data: alpha, info } = await sharp(file)
    .ensureAlpha()
    .resize({ width: WORK_WIDTH, withoutEnlargement: true })
    .extractChannel('alpha')
    .raw()
    .toBuffer({ resolveWithObject: true })
  const { width: W, height: H } = info

  // 8-connected component labelling over the ink mask.
  const labels = new Int32Array(W * H)
  const boxes: { x0: number; y0: number; x1: number; y1: number; size: number }[] = []
  const stack: number[] = []
  for (let start = 0; start < W * H; start++) {
    if (labels[start] || alpha[start]! < INK_ALPHA) continue
    const id = boxes.length + 1
    const box = { x0: W, y0: H, x1: 0, y1: 0, size: 0 }
    labels[start] = id
    stack.push(start)
    while (stack.length) {
      const p = stack.pop()!
      const x = p % W
      const y = (p - x) / W
      box.size++
      if (x < box.x0) box.x0 = x
      if (x > box.x1) box.x1 = x
      if (y < box.y0) box.y0 = y
      if (y > box.y1) box.y1 = y
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx
          const ny = y + dy
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
          const n = ny * W + nx
          if (!labels[n] && alpha[n]! >= INK_ALPHA) {
            labels[n] = id
            stack.push(n)
          }
        }
      }
    }
    boxes.push(box)
  }

  // Drop specks (scan noise); real strokes are far larger.
  const minSize = Math.max(12, (W * H) / 4000)
  const parts = boxes
    .map((b, i) => ({ ...b, id: i + 1 }))
    .filter((b) => b.size >= minSize)
    .sort((a, b) => b.x1 - a.x1) // right-to-left writing order
  if (parts.length === 0) return null

  const weights = parts.map((b) => {
    const w = b.x1 - b.x0 + 1
    const h = b.y1 - b.y0 + 1
    return { direction: h > w * 1.6 ? ('down' as const) : ('rtl' as const), length: Math.max(w, h) }
  })

  let clock = 100 // brief pause before the pen touches the paper
  const strokes: SignatureStroke[] = []
  for (const [i, b] of parts.entries()) {
    const w = b.x1 - b.x0 + 1
    const h = b.y1 - b.y0 + 1
    const rgba = Buffer.alloc(w * h * 4)
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const src = (b.y0 + y) * W + (b.x0 + x)
        if (labels[src] === b.id) rgba[(y * w + x) * 4 + 3] = alpha[src]!
      }
    }
    const png = await sharp(rgba, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer()

    // ~1 signature-width per 0.55s – a confident hand – never so short that a stroke "pops".
    const durationMs = Math.round(Math.min(340, Math.max(80, (weights[i]!.length / W) * 550)))
    strokes.push({
      left: (b.x0 / W) * 100,
      top: (b.y0 / H) * 100,
      width: (w / W) * 100,
      height: (h / H) * 100,
      src: `data:image/png;base64,${png.toString('base64')}`,
      direction: weights[i]!.direction,
      durationMs,
      delayMs: clock,
    })
    clock += durationMs + PEN_LIFT_MS
  }

  return { aspectRatio: W / H, strokes }
}
