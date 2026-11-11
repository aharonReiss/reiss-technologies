/**
 * Internal links the site needs for crawling and for visitors moving on from the
 * home page. Content, not code, so it is added once through the Local API and
 * stays editable in the admin. Adds only what is missing: running it again
 * changes nothing.
 *
 *   pnpm payload run scripts/internal-links.ts
 *
 * - Home hero: a third link, to the services page.
 * - Home and services pages: the latest three articles, before the closing CTA.
 * - Footer, "החברה" column: the blog.
 */
import { getPayload } from 'payload'

import config from '@payload-config'
import type { Page } from '@/payload-types'

const payload = await getPayload({ config })
const ctx = { disableRevalidate: true }

const pageBySlug = async (slug: string) =>
  (await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1, depth: 0, draft: false })).docs[0] as
    | Page
    | undefined

const refTo = (page: Page) => ({ relationTo: 'pages' as const, value: page.id })
const pointsTo = (link: unknown, page: Page) => {
  const ref = (link as { reference?: { relationTo?: string; value?: unknown } } | undefined)?.reference
  const value = ref?.value && typeof ref.value === 'object' ? (ref.value as { id: number }).id : ref?.value
  return ref?.relationTo === 'pages' && value === page.id
}

const [home, services, blog] = await Promise.all([pageBySlug('home'), pageBySlug('services'), pageBySlug('blog')])
if (!home || !services || !blog) {
  payload.logger.error('Missing one of the pages home / services / blog; nothing changed.')
  process.exit(1)
}

const blogTeaser = () => ({
  blockType: 'blogTeaser' as const,
  heading: 'מהבלוג',
  limit: 3,
  showLink: true,
  link: { type: 'reference' as const, reference: refTo(blog), label: 'לכל המאמרים' },
})

/** The teaser goes before the closing CTA (the last block), or at the end. */
const withTeaser = (layout: Page['layout']) => {
  const blocks = [...(layout ?? [])]
  if (blocks.some((b) => b.blockType === 'blogTeaser')) return null
  const at = blocks.at(-1)?.blockType === 'cta' ? blocks.length - 1 : blocks.length
  blocks.splice(at, 0, blogTeaser() as never)
  return blocks
}

// Home: hero link to services, and the latest articles.
{
  let layout = [...(home.layout ?? [])]
  let changed = false
  const hero = layout.find((b) => b.blockType === 'hero') as Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }> | undefined
  if (hero && !(hero.links ?? []).some((l) => pointsTo(l.link, services))) {
    hero.links = [...(hero.links ?? []), { link: { type: 'reference', reference: refTo(services), label: 'השירותים שלנו' } }] as never
    changed = true
  }
  const teased = withTeaser(layout)
  if (teased) {
    layout = teased
    changed = true
  }
  if (changed) {
    await payload.update({ collection: 'pages', id: home.id, data: { layout, _status: 'published' }, context: ctx })
    payload.logger.info('Home: updated')
  } else payload.logger.info('Home: already done')
}

// Services: the latest articles.
{
  const teased = withTeaser(services.layout)
  if (teased) {
    await payload.update({ collection: 'pages', id: services.id, data: { layout: teased, _status: 'published' }, context: ctx })
    payload.logger.info('Services: updated')
  } else payload.logger.info('Services: already done')
}

// Footer: the blog, in the column with about / projects / contact.
{
  const footer = await payload.findGlobal({ slug: 'footer', depth: 0 })
  const columns = footer.columns ?? []
  const linked = columns.some((c) => (c.links ?? []).some((l) => pointsTo(l.link, blog) || (l.link as { url?: string })?.url === '/blog'))
  const column = columns.find((c) => (c.links ?? []).some((l) => pointsTo(l.link, home) || /אודות|פרויקטים/.test(l.link?.label ?? ''))) ?? columns.at(-1)
  if (!linked && column) {
    const links = [...(column.links ?? [])]
    // After "projects" when it is there, else before the last link (usually contact).
    const after = links.findIndex((l) => /פרויקטים/.test(l.link?.label ?? ''))
    links.splice(after >= 0 ? after + 1 : Math.max(0, links.length - 1), 0, {
      link: { type: 'reference', reference: refTo(blog), label: 'בלוג' },
    } as never)
    column.links = links
    await payload.updateGlobal({ slug: 'footer', data: { columns }, context: ctx })
    payload.logger.info('Footer: blog link added')
  } else payload.logger.info('Footer: already done')
}

process.exit(0)
