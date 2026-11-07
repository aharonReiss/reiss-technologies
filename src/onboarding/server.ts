import type { Payload } from 'payload'

import type { ClientFile, ClientProfile, Questionnaire } from '@/payload-types'
import { getPayloadClient } from '@/utilities/payload'
import {
  IMAGE_TYPES,
  checkAnswers,
  isFileQuestion,
  type Answers,
  type Snapshot,
  type SnapshotQuestion,
  type UploadedFile,
} from './types'

/** Tokens are 43 URL-safe characters; anything else is rejected before touching the database. */
const TOKEN = /^[A-Za-z0-9_-]{40,64}$/

/** The client behind a link, when the link is valid, active and not archived. */
export async function clientByToken(token: string): Promise<ClientProfile | null> {
  if (!TOKEN.test(token)) return null
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'client-profiles',
    where: { token: { equals: token }, linkActive: { equals: true }, archived: { not_equals: true } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  return docs[0] ?? null
}

/** The questionnaire as published (or the current draft, for the admin preview), in the shape clients get. */
export async function currentQuestionnaire(draft = false): Promise<Snapshot> {
  const payload = await getPayloadClient()
  const q = (await payload.findGlobal({ slug: 'questionnaire', draft, overrideAccess: true })) as Questionnaire
  return {
    version: q.updatedAt || '',
    intro: q.intro || undefined,
    closingTitle: q.closingTitle || undefined,
    closingText: q.closingText || undefined,
    maxFileSizeMB: q.maxFileSizeMB || 25,
    sections: (q.sections ?? []).map((s) => ({
      id: s.id!,
      title: s.title,
      description: s.description || undefined,
      questions: (s.questions ?? []).map(
        (x): SnapshotQuestion => ({
          id: x.id!,
          label: x.label,
          type: x.type,
          required: Boolean(x.required),
          help: x.help || undefined,
          placeholder: x.placeholder || undefined,
          options: x.options?.map((o) => o.label).filter(Boolean),
          multiple: x.multiple ?? true,
        }),
      ),
    })),
  }
}

/**
 * The questionnaire this client answers. A client who has not started gets the
 * current published version; from the first save on, they keep that copy, so
 * edits to the questionnaire never change or orphan answers already given.
 */
export async function questionnaireFor(client: ClientProfile): Promise<Snapshot> {
  const kept = client.questionnaire as Snapshot | null
  if (kept?.sections && client.status !== 'not-started') return kept
  return currentQuestionnaire()
}

export const allQuestions = (s: Snapshot) => s.sections.flatMap((x) => x.questions)

const toUploaded = (f: ClientFile): UploadedFile => ({
  id: f.id,
  questionId: f.questionId || '',
  name: f.originalName || f.filename || 'קובץ',
  mimeType: f.mimeType || '',
  size: f.filesize || 0,
  isImage: IMAGE_TYPES.includes(f.mimeType || ''),
})

export async function filesOf(clientId: number, payload?: Payload): Promise<UploadedFile[]> {
  const p = payload ?? (await getPayloadClient())
  const { docs } = await p.find({
    collection: 'client-files',
    where: { client: { equals: clientId } },
    sort: 'createdAt',
    limit: 1000,
    pagination: false,
    depth: 0,
    overrideAccess: true,
  })
  return docs.map(toUploaded)
}

/** Answers limited to this questionnaire's non-file questions; anything else is dropped. */
function clean(snapshot: Snapshot, input: unknown): Answers {
  const out: Answers = {}
  if (!input || typeof input !== 'object') return out
  for (const q of allQuestions(snapshot)) {
    if (isFileQuestion(q)) continue
    const v = (input as Record<string, unknown>)[q.id]
    if (typeof v === 'string') out[q.id] = v
    else if (Array.isArray(v) && v.every((x) => typeof x === 'string')) out[q.id] = v as string[]
  }
  return out
}

/** File answers come from what is actually uploaded, never from the browser. */
function withFiles(snapshot: Snapshot, answers: Answers, files: UploadedFile[]): Answers {
  const all = { ...answers }
  for (const q of allQuestions(snapshot).filter(isFileQuestion)) {
    all[q.id] = files.filter((f) => f.questionId === q.id).map((f) => f.id)
  }
  return all
}

export type SaveResult =
  | { ok: true; status: ClientProfile['status']; savedAt: string }
  | { ok: false; error: string; errors?: Record<string, string> }

/**
 * Saves the client's answers (a draft), or submits them. A draft is checked for
 * shape only; a submission also for required answers. The first save freezes
 * the questionnaire version the client sees.
 */
export async function saveAnswers(token: string, input: unknown, submit: boolean): Promise<SaveResult> {
  const client = await clientByToken(token)
  if (!client) return { ok: false, error: 'הקישור אינו פעיל. פנו אלינו לקבלת קישור חדש.' }
  if (client.status === 'completed') return { ok: false, error: 'השאלון כבר נשלח. אם צריך לשנות משהו, כתבו לנו.' }

  const payload = await getPayloadClient()
  const snapshot = await questionnaireFor(client)
  const answers = clean(snapshot, input)
  const files = await filesOf(client.id, payload)
  const errors = checkAnswers(allQuestions(snapshot), withFiles(snapshot, answers, files), submit)
  if (Object.keys(errors).length) {
    return { ok: false, error: submit ? 'יש כמה שדות שצריך להשלים' : 'חלק מהתשובות לא תקינות', errors }
  }

  const now = new Date().toISOString()
  const status = submit ? 'completed' : 'in-progress'
  await payload.update({
    collection: 'client-profiles',
    id: client.id,
    data: {
      answers,
      questionnaire: snapshot,
      status,
      lastActivityAt: now,
      ...(submit ? { submittedAt: now } : {}),
    },
    overrideAccess: true,
    depth: 0,
  })
  return { ok: true, status, savedAt: now }
}

/** Marks activity and freezes the questionnaire on the first upload, so file questions keep their ids. */
export async function touch(client: ClientProfile, snapshot: Snapshot) {
  const payload = await getPayloadClient()
  await payload.update({
    collection: 'client-profiles',
    id: client.id,
    data: {
      lastActivityAt: new Date().toISOString(),
      ...(client.status === 'not-started' ? { status: 'in-progress', questionnaire: snapshot } : {}),
    },
    overrideAccess: true,
    depth: 0,
  })
}
