'use client'

import { useRowLabel } from '@payloadcms/ui'

import { QUESTION_TYPES } from '@/onboarding/types'

/** "שלב 2: על העסק" instead of "שלב 02" in the questionnaire editor. */
export function SectionRowLabel() {
  const { data, rowNumber } = useRowLabel<{ title?: string }>()
  return <span>{`שלב ${(rowNumber ?? 0) + 1}${data?.title ? `: ${data.title}` : ''}`}</span>
}

/** The question itself, its type, and a star when it is required. */
export function QuestionRowLabel() {
  const { data, rowNumber } = useRowLabel<{ label?: string; type?: string; required?: boolean }>()
  const type = QUESTION_TYPES.find((t) => t.value === data?.type)?.label
  return (
    <span>
      {data?.label || `שאלה ${(rowNumber ?? 0) + 1}`}
      {data?.required ? ' *' : ''}
      {type && <span style={{ opacity: 0.55, fontWeight: 400 }}>{` · ${type}`}</span>}
    </span>
  )
}

/** The system's name in a client's access list. */
export function CredentialRowLabel() {
  const { data, rowNumber } = useRowLabel<{ system?: string }>()
  return <span>{data?.system || `מערכת ${(rowNumber ?? 0) + 1}`}</span>
}
