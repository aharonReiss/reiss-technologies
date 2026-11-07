/** Question types of the onboarding questionnaire, with their admin labels. */
export const QUESTION_TYPES = [
  { value: 'text', label: 'טקסט קצר' },
  { value: 'textarea', label: 'טקסט ארוך' },
  { value: 'radio', label: 'בחירה אחת' },
  { value: 'checkbox', label: 'בחירה מרובה' },
  { value: 'select', label: 'רשימה נפתחת' },
  { value: 'yesno', label: 'כן / לא' },
  { value: 'url', label: 'קישור (URL)' },
  { value: 'file', label: 'העלאת קבצים' },
  { value: 'image', label: 'העלאת תמונות' },
] as const

export type QuestionType = (typeof QUESTION_TYPES)[number]['value']

export type SnapshotQuestion = {
  id: string
  label: string
  type: QuestionType
  required: boolean
  help?: string
  placeholder?: string
  options?: string[]
  multiple?: boolean
}

export type SnapshotSection = { id: string; title: string; description?: string; questions: SnapshotQuestion[] }

/** The questionnaire as a client received it: a frozen copy of one published version. */
export type Snapshot = {
  version: string
  intro?: string
  closingTitle?: string
  closingText?: string
  maxFileSizeMB: number
  sections: SnapshotSection[]
}

/** Text for text-like questions, a list for checkboxes, file ids for uploads. */
export type AnswerValue = string | string[] | number[]
export type Answers = Record<string, AnswerValue>

export type UploadedFile = {
  id: number
  questionId: string
  name: string
  mimeType: string
  size: number
  isImage: boolean
}

export type ClientStatus = 'not-started' | 'in-progress' | 'completed'

export const STATUS_LABELS: Record<ClientStatus, string> = {
  'not-started': 'טרם התחיל',
  'in-progress': 'בתהליך',
  completed: 'הושלם',
}

export const isFileQuestion = (q: SnapshotQuestion) => q.type === 'file' || q.type === 'image'

export const MAX_TEXT = 5000
export const MAX_FILES_PER_QUESTION = 30

/** Images we show as thumbnails; SVG is left out on purpose (it can carry scripts). */
export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif', 'image/avif']

/** Everything else a client may send: documents, design files, archives. */
export const FILE_TYPES = [
  ...IMAGE_TYPES,
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.oasis.opendocument.text',
  'text/plain',
  'text/csv',
  'application/zip',
  'application/x-zip-compressed',
  'application/postscript',
  'application/illustrator',
  'image/vnd.adobe.photoshop',
  'application/x-photoshop',
]

/** Extensions offered in the file picker; the server checks the actual type. */
export const ACCEPT = {
  image: '.jpg,.jpeg,.png,.webp,.gif,.heic,.heif,.avif',
  file: '.jpg,.jpeg,.png,.webp,.gif,.heic,.heif,.avif,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.odt,.txt,.csv,.zip,.ai,.eps,.psd',
}

const isUrl = (v: string) => {
  try {
    const u = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`)
    return u.hostname.includes('.')
  } catch {
    return false
  }
}

const empty = (v: AnswerValue | undefined) => v === undefined || (Array.isArray(v) ? v.length === 0 : v.trim() === '')

/**
 * One answer against its question: the shape, the allowed options, URL format and
 * length. `final` adds the required check (on submit, not while saving a draft).
 * Returns an error message in Hebrew, or null.
 */
export function checkAnswer(q: SnapshotQuestion, v: AnswerValue | undefined, final: boolean): string | null {
  if (empty(v)) return final && q.required ? 'שדה חובה' : null
  switch (q.type) {
    case 'text':
    case 'textarea':
      return typeof v === 'string' && v.length <= MAX_TEXT ? null : 'התשובה ארוכה מדי'
    case 'url':
      return typeof v === 'string' && isUrl(v.trim()) ? null : 'נראה שזה לא קישור תקין, למשל example.co.il'
    case 'radio':
    case 'select':
      return typeof v === 'string' && q.options?.includes(v) ? null : 'יש לבחור אחת מהאפשרויות'
    case 'yesno':
      return v === 'כן' || v === 'לא' ? null : 'יש לבחור כן או לא'
    case 'checkbox':
      return Array.isArray(v) && v.every((x) => typeof x === 'string' && q.options?.includes(x)) ? null : 'בחירה לא תקינה'
    case 'file':
    case 'image':
      return Array.isArray(v) && v.every((x) => typeof x === 'number') ? null : 'קבצים לא תקינים'
    default:
      return 'סוג שאלה לא מוכר'
  }
}

/** Errors by question id for the whole questionnaire, or for one section's questions. */
export function checkAnswers(questions: SnapshotQuestion[], answers: Answers, final: boolean) {
  const errors: Record<string, string> = {}
  for (const q of questions) {
    const e = checkAnswer(q, answers[q.id], final)
    if (e) errors[q.id] = e
  }
  return errors
}
