import type { UIFieldServerComponent } from 'payload'
import React from 'react'

import type { ClientFile } from '@/payload-types'
import { IMAGE_TYPES, STATUS_LABELS, isFileQuestion, type Answers, type ClientStatus, type Snapshot } from '@/onboarding/types'

const dateTime = new Intl.DateTimeFormat('he-IL', { dateStyle: 'medium', timeStyle: 'short' })
const size = (n?: number | null) => (!n ? '' : n < 1024 * 1024 ? `${Math.round(n / 1024)} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`)

const card: React.CSSProperties = {
  border: '1px solid var(--theme-elevation-150)',
  borderRadius: 'var(--style-radius-m)',
  padding: '1.25rem 1.5rem',
  marginBottom: '1.25rem',
  background: 'var(--theme-elevation-0)',
}
const muted: React.CSSProperties = { color: 'var(--theme-elevation-500)' }

/**
 * A client's questionnaire as they answered it: grouped by step, in the version
 * they received, with their files under the question they were uploaded to.
 * Images preview inline; every file opens or downloads (admin access only).
 */
export const ClientResponses: UIFieldServerComponent = async ({ data, id, payload }) => {
  if (!id) return null
  const status = (data?.status ?? 'not-started') as ClientStatus
  const snapshot = data?.questionnaire as Snapshot | null
  const answers = (data?.answers ?? {}) as Answers

  const { docs: files } = await payload.find({
    collection: 'client-files',
    where: { client: { equals: id } },
    sort: 'createdAt',
    limit: 1000,
    pagination: false,
    depth: 0,
  })

  const header = (
    <div style={{ ...card, display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'baseline' }}>
      <div>
        <div style={muted}>סטטוס</div>
        <strong style={{ fontSize: '1.15rem', color: status === 'completed' ? 'var(--theme-success-500)' : undefined }}>
          {STATUS_LABELS[status]}
        </strong>
      </div>
      {data?.lastActivityAt && (
        <div>
          <div style={muted}>פעילות אחרונה</div>
          {dateTime.format(new Date(data.lastActivityAt))}
        </div>
      )}
      {data?.submittedAt && (
        <div>
          <div style={muted}>נשלח</div>
          {dateTime.format(new Date(data.submittedAt))}
        </div>
      )}
      <div>
        <div style={muted}>קבצים</div>
        {files.length}
      </div>
    </div>
  )

  if (!snapshot?.sections) {
    return (
      <div style={{ marginBottom: '2rem' }}>
        {header}
        <p style={muted}>הלקוח עוד לא התחיל למלא את השאלון. התשובות יופיעו כאן ברגע שיתחיל.</p>
      </div>
    )
  }

  const asked = new Set(snapshot.sections.flatMap((s) => s.questions.map((q) => q.id)))
  const loose = files.filter((f) => !asked.has(f.questionId || ''))

  return (
    <div style={{ marginBottom: '2rem' }}>
      {header}
      {snapshot.sections.map((section, i) => (
        <section key={section.id} style={card}>
          <h3 style={{ margin: '0 0 1rem' }}>
            <span style={muted}>{`שלב ${i + 1} · `}</span>
            {section.title}
          </h3>
          <dl style={{ margin: 0, display: 'grid', gap: '1.1rem' }}>
            {section.questions.map((q) => {
              const v = answers[q.id]
              const own = files.filter((f) => f.questionId === q.id)
              const empty = isFileQuestion(q) ? own.length === 0 : v === undefined || (Array.isArray(v) ? v.length === 0 : !String(v).trim())
              return (
                <div key={q.id}>
                  <dt style={{ fontWeight: 600, marginBottom: '0.3rem' }}>{q.label}</dt>
                  <dd style={{ margin: 0, whiteSpace: 'pre-wrap', ...(empty ? muted : {}) }}>
                    {empty ? 'לא נענה' : isFileQuestion(q) ? <Files files={own} /> : <Answer value={v} url={q.type === 'url'} />}
                  </dd>
                </div>
              )
            })}
          </dl>
        </section>
      ))}
      {loose.length > 0 && (
        <section style={card}>
          <h3 style={{ margin: '0 0 1rem' }}>קבצים נוספים</h3>
          <Files files={loose} />
        </section>
      )}
    </div>
  )
}

function Answer({ value, url }: { value: Answers[string] | undefined; url: boolean }) {
  if (Array.isArray(value)) return <>{value.join(' · ')}</>
  const text = String(value ?? '')
  if (url) {
    const href = /^https?:\/\//i.test(text) ? text : `https://${text}`
    return (
      <a href={href} target="_blank" rel="noopener noreferrer nofollow" dir="ltr">
        {text}
      </a>
    )
  }
  return <>{text}</>
}

function Files({ files }: { files: ClientFile[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
      {files.map((f) => {
        const image = IMAGE_TYPES.includes(f.mimeType || '')
        const thumb = image ? f.sizes?.thumbnail?.url || f.url : null
        return (
          <div
            key={f.id}
            style={{ width: 168, border: '1px solid var(--theme-elevation-150)', borderRadius: 'var(--style-radius-s)', overflow: 'hidden', background: 'var(--theme-elevation-50)' }}
          >
            <a href={f.url || '#'} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
              {thumb ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={thumb} alt={f.originalName || ''} style={{ display: 'block', width: '100%', height: 120, objectFit: 'cover' }} />
              ) : (
                <div style={{ height: 120, display: 'grid', placeItems: 'center', fontWeight: 700, textTransform: 'uppercase', ...muted }}>
                  {(f.originalName || f.filename || '').split('.').pop()?.slice(0, 5)}
                </div>
              )}
            </a>
            <div style={{ padding: '0.5rem 0.6rem', fontSize: '0.8rem' }}>
              <div dir="auto" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={f.originalName || ''}>
                {f.originalName || f.filename}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem', ...muted }}>
                <span>{size(f.filesize)}</span>
                <a href={f.url || '#'} download={f.originalName || true}>
                  הורדה
                </a>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
