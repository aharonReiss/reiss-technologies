import { FILE_TYPES, IMAGE_TYPES, MAX_FILES_PER_QUESTION, isFileQuestion } from '@/onboarding/types'
import { allQuestions, clientByToken, filesOf, questionnaireFor, touch } from '@/onboarding/server'
import { getPayloadClient } from '@/utilities/payload'

type Args = { params: Promise<{ token: string }> }

const fail = (error: string, status = 400) => Response.json({ error }, { status })

/**
 * One file for one upload question, from the client's own link. The type is
 * checked against the question (images only for an image question), the size
 * against the questionnaire's limit, and the file is stored privately.
 */
export async function POST(request: Request, { params }: Args) {
  const { token } = await params
  const client = await clientByToken(token)
  if (!client) return fail('הקישור אינו פעיל', 404)
  if (client.status === 'completed') return fail('השאלון כבר נשלח', 409)

  const form = await request.formData().catch(() => null)
  const file = form?.get('file')
  const questionId = form?.get('questionId')
  if (!(file instanceof File) || typeof questionId !== 'string') return fail('בקשה לא תקינה')

  const snapshot = await questionnaireFor(client)
  const question = allQuestions(snapshot).find((q) => q.id === questionId)
  if (!question || !isFileQuestion(question)) return fail('השאלה לא נמצאה')

  const allowed = question.type === 'image' ? IMAGE_TYPES : FILE_TYPES
  if (!allowed.includes(file.type)) {
    return fail(question.type === 'image' ? 'אפשר להעלות כאן רק תמונות (JPG, PNG, WEBP, HEIC)' : 'סוג הקובץ לא נתמך. אפשר לשלוח אותו בתוך קובץ ZIP')
  }
  if (file.size > snapshot.maxFileSizeMB * 1024 * 1024) return fail(`הקובץ גדול מ־${snapshot.maxFileSizeMB}MB`)
  if (file.size === 0) return fail('הקובץ ריק')

  const payload = await getPayloadClient()
  const existing = (await filesOf(client.id, payload)).filter((f) => f.questionId === questionId)
  if (!question.multiple && existing.length >= 1) return fail('בשאלה הזו אפשר להעלות קובץ אחד. הסירו את הקיים כדי להחליף')
  if (existing.length >= MAX_FILES_PER_QUESTION) return fail(`עד ${MAX_FILES_PER_QUESTION} קבצים לשאלה`)

  const name = file.name.normalize('NFC').slice(-150) || 'file'
  // Payload checks the file's content too (a damaged PDF or image is refused).
  const doc = await payload
    .create({
      collection: 'client-files',
      data: { client: client.id, questionId, questionLabel: question.label, originalName: name },
      file: { data: Buffer.from(await file.arrayBuffer()), mimetype: file.type, name, size: file.size },
      overrideAccess: true,
      depth: 0,
    })
    .catch((err: unknown) => {
      payload.logger.warn({ err, client: client.id }, 'Client file upload refused')
      return null
    })
  if (!doc) return fail('לא הצלחנו לקרוא את הקובץ. ייתכן שהוא פגום. נסו לשמור אותו מחדש או לשלוח בתוך ZIP')
  await touch(client, snapshot)

  return Response.json({
    id: doc.id,
    questionId,
    name,
    mimeType: file.type,
    size: file.size,
    isImage: IMAGE_TYPES.includes(file.type),
  })
}
