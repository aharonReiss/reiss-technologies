'use server'

import { clientByToken, saveAnswers } from '@/onboarding/server'
import { getPayloadClient } from '@/utilities/payload'

/** Saves progress (submit = false) or sends the questionnaire. Everything is re-checked on the server. */
export async function saveAction(token: string, answers: unknown, submit: boolean) {
  if (typeof token !== 'string') return { ok: false as const, error: 'בקשה לא תקינה' }
  return saveAnswers(token, answers, Boolean(submit))
}

/** Removes one of the client's own files, until the questionnaire is sent. */
export async function deleteFileAction(token: string, fileId: number) {
  const client = typeof token === 'string' ? await clientByToken(token) : null
  if (!client || client.status === 'completed' || !Number.isInteger(fileId)) return { ok: false }
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'client-files',
    where: { id: { equals: fileId }, client: { equals: client.id } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  if (!docs[0]) return { ok: false }
  await payload.delete({ collection: 'client-files', id: fileId, overrideAccess: true })
  return { ok: true }
}
