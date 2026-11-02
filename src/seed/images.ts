import sharp from 'sharp'

/** Placeholder artwork rendered from SVG, so the seed needs no external downloads. */

type Palette = { from: string; to: string; accent: string; ui: string }

export const palettes: Palette[] = [
  { from: '#3b4cf5', to: '#1b1f5e', accent: '#c8f24a', ui: '#ffffff' },
  { from: '#ff7a59', to: '#7a1f3d', accent: '#ffe066', ui: '#fff8f0' },
  { from: '#0f9d8a', to: '#0b3b3c', accent: '#b8f5e0', ui: '#f2fffb' },
  { from: '#8b5cf6', to: '#2e1065', accent: '#f0abfc', ui: '#faf5ff' },
  { from: '#111827', to: '#374151', accent: '#c8f24a', ui: '#f9fafb' },
  { from: '#f59e0b', to: '#7c2d12', accent: '#fff7ed', ui: '#fffbeb' },
  { from: '#0ea5e9', to: '#0c4a6e', accent: '#e0f2fe', ui: '#f0f9ff' },
]

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

/** A gradient backdrop with a stylised website mockup in a browser frame. */
export function websiteMockup(label: string, palette: Palette, width = 1600, height = 1200) {
  const { from, to, accent, ui } = palette
  const bx = width * 0.12
  const by = height * 0.16
  const bw = width * 0.76
  const bh = height * 0.84
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <filter id="s" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="30" stdDeviation="40" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <circle cx="${width * 0.85}" cy="${height * 0.12}" r="${width * 0.22}" fill="${accent}" opacity="0.18"/>
  <circle cx="${width * 0.08}" cy="${height * 0.9}" r="${width * 0.16}" fill="#fff" opacity="0.08"/>
  <g filter="url(#s)">
    <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="22" fill="${ui}"/>
  </g>
  <rect x="${bx}" y="${by}" width="${bw}" height="56" rx="22" fill="#000" opacity="0.06"/>
  <circle cx="${bx + 34}" cy="${by + 28}" r="8" fill="#ff5f57"/>
  <circle cx="${bx + 60}" cy="${by + 28}" r="8" fill="#febc2e"/>
  <circle cx="${bx + 86}" cy="${by + 28}" r="8" fill="#28c840"/>
  <rect x="${bx + bw * 0.3}" y="${by + 16}" width="${bw * 0.4}" height="24" rx="12" fill="#000" opacity="0.07"/>
  <text x="${bx + 60}" y="${by + 140}" font-family="Arial, Helvetica, sans-serif" font-size="${width * 0.022}" font-weight="700" fill="${to}">${esc(label)}</text>
  <rect x="${bx + bw - 380}" y="${by + 112}" width="80" height="12" rx="6" fill="${to}" opacity="0.25"/>
  <rect x="${bx + bw - 280}" y="${by + 112}" width="80" height="12" rx="6" fill="${to}" opacity="0.25"/>
  <rect x="${bx + bw - 180}" y="${by + 100}" width="120" height="36" rx="18" fill="${from}"/>
  <rect x="${bx + 60}" y="${by + 230}" width="${bw * 0.48}" height="${height * 0.045}" rx="10" fill="${to}"/>
  <rect x="${bx + 60}" y="${by + 230 + height * 0.065}" width="${bw * 0.36}" height="${height * 0.045}" rx="10" fill="${to}"/>
  <rect x="${bx + 60}" y="${by + 230 + height * 0.15}" width="${bw * 0.42}" height="14" rx="7" fill="${to}" opacity="0.2"/>
  <rect x="${bx + 60}" y="${by + 260 + height * 0.15}" width="${bw * 0.34}" height="14" rx="7" fill="${to}" opacity="0.2"/>
  <rect x="${bx + 60}" y="${by + 320 + height * 0.15}" width="170" height="52" rx="26" fill="${from}"/>
  <rect x="${bx + bw * 0.58}" y="${by + 200}" width="${bw * 0.36}" height="${bh * 0.42}" rx="20" fill="${accent}"/>
  <circle cx="${bx + bw * 0.76}" cy="${by + 200 + bh * 0.21}" r="${bh * 0.11}" fill="${from}" opacity="0.85"/>
  ${[0, 1, 2]
    .map(
      (i) =>
        `<rect x="${bx + 60 + i * (bw - 120) * 0.34}" y="${by + bh * 0.72}" width="${(bw - 120) * 0.31}" height="${bh * 0.22}" rx="16" fill="#000" opacity="0.05"/>`,
    )
    .join('\n  ')}
</svg>`
}

/** Abstract artwork for blog posts and image/text sections. */
export function abstractArt(palette: Palette, seed: number, width = 1600, height = 1000) {
  const { from, to, accent } = palette
  const shapes = Array.from({ length: 6 }, (_, i) => {
    const r = ((seed * 37 + i * 53) % 100) / 100
    const cx = width * ((i * 0.19 + r * 0.3) % 1)
    const cy = height * ((i * 0.27 + r * 0.5) % 1)
    const size = width * (0.08 + r * 0.18)
    return i % 2
      ? `<circle cx="${cx}" cy="${cy}" r="${size}" fill="${i % 3 ? accent : '#fff'}" opacity="${0.12 + r * 0.25}"/>`
      : `<rect x="${cx}" y="${cy}" width="${size * 1.4}" height="${size * 1.4}" rx="${size * 0.3}" transform="rotate(${r * 60} ${cx} ${cy})" fill="${accent}" opacity="${0.15 + r * 0.3}"/>`
  }).join('\n  ')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>
  </linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  ${shapes}
</svg>`
}

/** Monochrome wordmark logo for the client logo cloud. */
export function wordmark(name: string, shape: number) {
  const mark = [
    '<circle cx="24" cy="30" r="16" fill="#1a1d2e"/>',
    '<rect x="8" y="14" width="32" height="32" rx="8" fill="#1a1d2e"/>',
    '<path d="M24 12 42 46H6Z" fill="#1a1d2e"/>',
    '<path d="M8 30a16 16 0 0 1 32 0Z" fill="#1a1d2e"/><rect x="8" y="34" width="32" height="10" rx="5" fill="#1a1d2e"/>',
  ][shape % 4]
  const width = 64 + name.length * 19
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="60">
  ${mark}
  <text x="56" y="40" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" fill="#1a1d2e">${esc(name)}</text>
</svg>`
}

export const svgToPng = (svg: string) => sharp(Buffer.from(svg)).png().toBuffer()
