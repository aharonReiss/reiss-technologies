import { readFile } from 'fs/promises'
import path from 'path'

import { IMAGE_TYPES } from '@/onboarding/types'
import { clientByToken } from '@/onboarding/server'
import { getPayloadClient } from '@/utilities/payload'

type Args = { params: Promise<{ token: string; id: string }> }

/**
 * A client's own file (or its thumbnail, ?size=thumbnail), so the questionnaire
 * can show what was uploaded. Only files of the client behind the token.
 */
export async function GET(request: Request, { params }: Args) {
  const { token, id } = await params
  const client = await clientByToken(token)
  if (!client || !/^\d+$/.test(id)) return new Response(null, { status: 404 })

  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'client-files',
    where: { id: { equals: Number(id) }, client: { equals: client.id } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const doc = docs[0]
  if (!doc?.filename) return new Response(null, { status: 404 })

  const thumb = new URL(request.url).searchParams.get('size') === 'thumbnail' ? doc.sizes?.thumbnail : null
  const filename = thumb?.filename || doc.filename
  const type = (thumb?.filename && thumb.mimeType) || doc.mimeType || 'application/octet-stream'
  const dir = payload.collections['client-files'].config.upload.staticDir!
  const data = await readFile(path.join(dir, path.basename(filename))).catch(() => null)
  if (!data) return new Response(null, { status: 404 })

  const inline = IMAGE_TYPES.includes(type)
  return new Response(new Uint8Array(data), {
    headers: {
      'Content-Type': type,
      'Content-Disposition': `${inline ? 'inline' : 'attachment'}; filename*=UTF-8''${encodeURIComponent(doc.originalName || filename)}`,
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex',
    },
  })
}
