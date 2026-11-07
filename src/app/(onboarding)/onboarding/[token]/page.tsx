import { headers } from 'next/headers'
import React from 'react'

import { OnboardingForm } from '@/components/onboarding/OnboardingForm'
import { clientByToken, currentQuestionnaire, filesOf, questionnaireFor } from '@/onboarding/server'
import type { Answers } from '@/onboarding/types'
import { getPayloadClient } from '@/utilities/payload'

type Args = { params: Promise<{ token: string }> }

export const dynamic = 'force-dynamic'

/**
 * A client's questionnaire, from their private link. /onboarding/preview shows
 * the current draft of the questionnaire to a logged-in admin, without saving.
 */
export default async function OnboardingPage({ params }: Args) {
  const { token } = await params

  if (token === 'preview') {
    const payload = await getPayloadClient()
    const { user } = await payload.auth({ headers: await headers() })
    if (!user) return <Closed title="תצוגה מקדימה" text="צריך להיות מחוברים לאדמין כדי לראות את התצוגה המקדימה." />
    return (
      <OnboardingForm
        token=""
        preview
        firstName="ישראל"
        questionnaire={await currentQuestionnaire(true)}
        answers={{}}
        files={[]}
        status="not-started"
      />
    )
  }

  const client = await clientByToken(decodeURIComponent(token))
  if (!client) {
    return <Closed title="הקישור לא פעיל" text="ייתכן שהקישור הוחלף או הושבת. כתבו לנו ונשלח לכם קישור חדש." />
  }

  const questionnaire = await questionnaireFor(client)
  if (questionnaire.sections.length === 0) {
    return <Closed title="השאלון עוד לא מוכן" text="נעדכן אתכם ברגע שהוא יהיה זמין." />
  }

  return (
    <OnboardingForm
      token={client.token!}
      firstName={client.firstName}
      questionnaire={questionnaire}
      answers={(client.answers as Answers | null) ?? {}}
      files={await filesOf(client.id)}
      status={client.status}
    />
  )
}

function Closed({ title, text }: { title: string; text: string }) {
  return (
    <main className="grid min-h-svh place-items-center px-6 text-center">
      <div className="max-w-md">
        <p className="m-0 font-display text-sm font-bold tracking-[0.12em] text-brand">REISS DIGITAL</p>
        <h1 className="mt-4 mb-0 font-display text-4xl font-black tracking-tight !text-ink">{title}</h1>
        <p className="mt-4 mb-0 text-lg leading-relaxed text-body">{text}</p>
      </div>
    </main>
  )
}
