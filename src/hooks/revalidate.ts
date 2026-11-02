import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from 'payload'

/**
 * Content is cross-linked everywhere (grids, menus, footer, sitemap), so any
 * published change refreshes the whole site cache. For a site of this size
 * that is instant and guarantees nothing stale is served.
 */
async function revalidateSite(req: PayloadRequest, reason: string) {
  if (req.context?.disableRevalidate) return
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/', 'layout')
    req.payload.logger.info(`Revalidated site: ${reason}`)
  } catch {
    // Called outside a Next.js request (e.g. seed script) – nothing to revalidate.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  collection,
  req,
}) => {
  const isDrafted = doc?._status === 'draft' && previousDoc?._status !== 'published'
  if (!isDrafted) await revalidateSite(req, `${collection.slug}/${doc.id}`)
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc, collection, req }) => {
  await revalidateSite(req, `${collection.slug}/${doc?.id} deleted`)
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc, global, req }) => {
  await revalidateSite(req, `global ${global.slug}`)
  return doc
}

export const revalidateHooks = {
  afterChange: [revalidateAfterChange],
  afterDelete: [revalidateAfterDelete],
}
