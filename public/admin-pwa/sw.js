/**
 * Service worker for the installable admin (scope /admin). It makes the admin an
 * installable app and nothing more: every request goes to the network, nothing
 * is cached, so client data and passwords never sit in a browser cache.
 * Offline, a page that says so instead of the browser's error.
 */
const OFFLINE = `<!doctype html><html lang="he" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>אין חיבור</title><body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#0d1020;color:#f8f9ff;font-family:system-ui,sans-serif;text-align:center;padding:24px"><div><p style="font-size:1.6rem;font-weight:800;margin:0">אין חיבור לאינטרנט</p><p style="opacity:.7">הניהול צריך חיבור. נסו שוב כשהחיבור יחזור.</p><button onclick="location.reload()" style="margin-top:12px;padding:12px 24px;border:0;border-radius:999px;background:#4355f5;color:#fff;font-size:1rem">לנסות שוב</button></div></body></html>`

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()))

self.addEventListener('fetch', (e) => {
  if (e.request.mode !== 'navigate') return
  e.respondWith(
    fetch(e.request).catch(() => new Response(OFFLINE, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })),
  )
})
