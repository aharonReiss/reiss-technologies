import { formatPrice } from '@/utilities/format'
import { getGlobal, getPayloadClient } from '@/utilities/payload'
import { absoluteURL, docPath } from '@/utilities/routes'
import { FOUNDER_NAME } from '@/utilities/seo'

// Rebuilt at most hourly; everything comes from the CMS.
export const revalidate = 3600

/**
 * /llms.txt: a plain Markdown summary of the studio for AI assistants and answer
 * engines (llmstxt.org): who we are, what we offer at what starting price, the
 * work and the articles, each with its URL. Published content only.
 */
export async function GET() {
  const payload = await getPayloadClient()
  const settings = await getGlobal('site-settings', 0)
  const query = { limit: 100, pagination: false, depth: 0, overrideAccess: false } as const
  const [services, projects, posts] = await Promise.all([
    payload.find({ collection: 'services', sort: '_order', ...query }),
    payload.find({ collection: 'projects', sort: '_order', ...query }),
    payload.find({ collection: 'posts', sort: '-publishedAt', ...query }),
  ])

  const name = settings.siteName || 'REISS DIGITAL'
  const { contact, seo } = settings
  const line = (title: string, url: string, text?: string | null) =>
    `- [${title}](${url})${text ? `: ${text.replace(/\s+/g, ' ').trim()}` : ''}`

  const out = [
    `# ${name}`,
    '',
    `> ${seo?.defaultDescription || settings.tagline || ''}`.trimEnd(),
    '',
    `סטודיו לבניית אתרים ומערכות Web לעסקים בישראל. נוסד על ידי ${FOUNDER_NAME}. האתר בעברית.`,
    '',
    '## פרטי קשר',
    '',
    ...[
      contact?.email && `- אימייל: ${contact.email}`,
      contact?.phone && `- טלפון: ${contact.phone}`,
      contact?.address && `- אזור: ${contact.address}`,
      `- יצירת קשר: ${absoluteURL(docPath('pages', 'contact'))}`,
    ].filter(Boolean),
    '',
    '## שירותים',
    '',
    ...services.docs.map((s) => {
      const price =
        s.pricing?.price && s.pricing.showPrice !== false
          ? ` (החל מ־${formatPrice(s.pricing.price)}${s.pricing.priceNote ? ` ${s.pricing.priceNote}` : ''})`
          : ''
      return line(s.title.replace(/\.$/, '') + price, absoluteURL(docPath('services', s.slug)), s.excerpt)
    }),
    '',
    '## פרויקטים',
    '',
    ...projects.docs.map((p) => line(p.title, absoluteURL(docPath('projects', p.slug)), p.excerpt)),
    '',
    ...(posts.docs.length
      ? ['## מאמרים', '', ...posts.docs.map((p) => line(p.title, absoluteURL(docPath('posts', p.slug)), p.excerpt)), '']
      : []),
    '## עמודים',
    '',
    line('אודות', absoluteURL('/about')),
    line('שירותים', absoluteURL('/services')),
    line('פרויקטים', absoluteURL('/projects')),
    line('בלוג', absoluteURL('/blog')),
    '',
  ]

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
