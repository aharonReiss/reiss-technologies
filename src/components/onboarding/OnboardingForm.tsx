'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

import { deleteFileAction, saveAction } from '@/app/(onboarding)/onboarding/[token]/actions'
import {
  checkAnswers,
  isFileQuestion,
  type AnswerValue,
  type Answers,
  type ClientStatus,
  type Snapshot,
  type SnapshotQuestion,
  type UploadedFile,
} from '@/onboarding/types'
import { cn } from '@/utilities/cn'
import { FileUpload } from './FileUpload'

type Props = {
  token: string
  firstName: string
  questionnaire: Snapshot
  answers: Answers
  files: UploadedFile[]
  status: ClientStatus
  /** Admin preview: nothing is saved or uploaded. */
  preview?: boolean
}

type SaveState = 'idle' | 'saving' | 'saved' | 'error'

/**
 * The client's questionnaire: a welcome, one section per step with a progress
 * bar, answers saved automatically as they go (and on demand), uploads per
 * question, and a confirmation once sent. Every answer is checked again on the
 * server; required answers block moving on only from their own step.
 */
export function OnboardingForm({ token, firstName, questionnaire, answers: initial, files: initialFiles, status, preview }: Props) {
  const { sections } = questionnaire
  const [answers, setAnswers] = useState<Answers>(initial)
  const [files, setFiles] = useState<UploadedFile[]>(initialFiles)
  const [step, setStep] = useState(-1) // -1: welcome
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [save, setSave] = useState<SaveState>('idle')
  const [notice, setNotice] = useState<string | null>(null)
  const [done, setDone] = useState(status === 'completed')
  const [sending, setSending] = useState(false)
  const dirty = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const top = useRef<HTMLDivElement>(null)
  const started = status !== 'not-started' || Object.keys(initial).length > 0 || initialFiles.length > 0

  const persist = useCallback(
    async (next: Answers) => {
      if (preview) return true
      setSave('saving')
      const res = await saveAction(token, next, false).catch(() => null)
      if (res?.ok) {
        dirty.current = false
        setSave('saved')
        return true
      }
      setSave('error')
      if (res && !res.ok && res.errors) setErrors((e) => ({ ...e, ...res.errors }))
      return false
    },
    [preview, token],
  )

  // Autosave a moment after the last change.
  useEffect(() => {
    if (!dirty.current) return
    clearTimeout(timer.current)
    timer.current = setTimeout(() => persist(answers), 1200)
    return () => clearTimeout(timer.current)
  }, [answers, persist])

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty.current || save === 'saving') e.preventDefault()
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [save])

  const set = (id: string, v: AnswerValue) => {
    dirty.current = true
    setAnswers((a) => ({ ...a, [id]: v }))
    setErrors((e) => {
      if (!e[id]) return e
      const { [id]: _, ...rest } = e
      return rest
    })
  }

  /** Answers with file questions filled from the uploads, for the same checks the server runs. */
  const withFiles = (): Answers => {
    const all = { ...answers }
    for (const q of sections.flatMap((s) => s.questions).filter(isFileQuestion)) {
      all[q.id] = files.filter((f) => f.questionId === q.id).map((f) => f.id)
    }
    return all
  }

  const go = (to: number) => {
    setStep(to)
    setNotice(null)
    requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const next = () => {
    const found = checkAnswers(sections[step].questions, withFiles(), true)
    setErrors(found)
    if (Object.keys(found).length) {
      focusFirstError(found)
      return
    }
    if (dirty.current) persist(answers)
    go(step + 1)
  }

  const submit = async () => {
    const found = checkAnswers(sections.flatMap((s) => s.questions), withFiles(), true)
    setErrors(found)
    if (Object.keys(found).length) {
      const at = sections.findIndex((s) => s.questions.some((q) => found[q.id]))
      if (at !== step) go(at)
      setTimeout(() => focusFirstError(found), 400)
      return
    }
    if (preview) {
      setDone(true)
      return
    }
    setSending(true)
    clearTimeout(timer.current)
    const res = await saveAction(token, answers, true).catch(() => null)
    setSending(false)
    if (res?.ok) {
      dirty.current = false
      setDone(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      if (res && !res.ok && res.errors) setErrors(res.errors)
      setNotice(res && !res.ok ? res.error : 'השליחה נכשלה. בדקו את החיבור לאינטרנט ונסו שוב.')
    }
  }

  const saveForLater = async () => {
    clearTimeout(timer.current)
    const ok = await persist(answers)
    setNotice(
      ok
        ? 'נשמר. אפשר לסגור את הדף ולחזור בכל זמן דרך אותו קישור, הכול יחכה לכם כאן.'
        : 'השמירה נכשלה. בדקו את החיבור לאינטרנט ונסו שוב.',
    )
  }

  if (done) {
    return (
      <Shell>
        <div className="mx-auto max-w-xl py-16 text-center md:py-24">
          <span aria-hidden className="mx-auto grid size-16 place-items-center rounded-full bg-brand text-3xl text-white">
            ✓
          </span>
          <h1 className="mt-8 mb-0 font-display text-[clamp(2.2rem,7vw,3.4rem)] leading-[1.05] font-black tracking-[-0.03em] !text-ink">
            {questionnaire.closingTitle || 'תודה, קיבלנו הכול'}
            <span className="text-brand">.</span>
          </h1>
          <p className="mt-5 mb-0 text-lg leading-[1.75] whitespace-pre-line text-body">
            {questionnaire.closingText || 'נעבור על התשובות והקבצים ונחזור אליכם בהקדם עם הצעדים הבאים.'}
          </p>
          {preview && <p className="mt-8 text-sm text-body/70">תצוגה מקדימה: שום דבר לא נשמר.</p>}
        </div>
      </Shell>
    )
  }

  if (step === -1) {
    const count = sections.reduce((n, s) => n + s.questions.length, 0)
    return (
      <Shell save={save} preview={preview}>
        <div className="mx-auto max-w-2xl py-12 md:py-20">
          <h1 className="m-0 font-display text-[clamp(2.6rem,9vw,4.4rem)] leading-[1] font-black tracking-[-0.04em] !text-ink">
            היי {firstName}
            <span className="text-brand">,</span>
          </h1>
          <p className="mt-6 mb-0 text-lg leading-[1.8] whitespace-pre-line text-body md:text-xl">
            {questionnaire.intro ||
              'כדי שנבנה בדיוק את מה שהעסק שלכם צריך, נשמח שתענו על כמה שאלות ותעלו חומרים שיש לכם: לוגו, תמונות, טקסטים.'}
          </p>
          <ul className="mt-8 mb-0 grid list-none gap-3 p-0 text-base text-body">
            <li>
              <b className="text-ink">{sections.length}</b> שלבים, <b className="text-ink">{count}</b> שאלות
            </li>
            <li>התשובות נשמרות אוטומטית. אפשר לעצור ולחזור דרך אותו קישור.</li>
            <li>אין תשובות נכונות או לא נכונות. מה שלא יודעים, משאירים ריק ונדבר על זה.</li>
          </ul>
          <button type="button" onClick={() => go(0)} className="btn-accent mt-10 max-md:w-full max-md:justify-center">
            {started ? 'להמשיך מאיפה שעצרתי' : 'מתחילים'}
          </button>
        </div>
      </Shell>
    )
  }

  const section = sections[step]
  const last = step === sections.length - 1

  return (
    <Shell save={save} preview={preview}>
      <div ref={top} className="mx-auto max-w-2xl scroll-mt-24 pt-8 pb-16 md:pt-12">
        <Progress step={step} total={sections.length} onJump={(i) => i < step && go(i)} titles={sections.map((s) => s.title)} />

        <h1 className="mt-10 mb-0 font-display text-[clamp(2rem,6vw,3rem)] leading-[1.05] font-black tracking-[-0.03em] !text-ink">
          {section.title}
          <span className="text-brand">.</span>
        </h1>
        {section.description && (
          <p className="mt-4 mb-0 text-lg leading-[1.75] whitespace-pre-line text-body">{section.description}</p>
        )}

        <div className="mt-10 grid gap-9">
          {section.questions.map((q) => (
            <Question
              key={q.id}
              q={q}
              value={answers[q.id]}
              error={errors[q.id]}
              onChange={(v) => set(q.id, v)}
            >
              {isFileQuestion(q) && (
                <FileUpload
                  token={token}
                  preview={preview}
                  question={q}
                  maxSizeMB={questionnaire.maxFileSizeMB}
                  files={files.filter((f) => f.questionId === q.id)}
                  onAdded={(f) => {
                    setFiles((all) => [...all, f])
                    setErrors(({ [q.id]: _, ...rest }) => rest)
                  }}
                  onRemove={async (f) => {
                    if (!preview) {
                      const res = await deleteFileAction(token, f.id).catch(() => null)
                      if (!res?.ok) return false
                    }
                    setFiles((all) => all.filter((x) => x.id !== f.id))
                    return true
                  }}
                />
              )}
            </Question>
          ))}
        </div>

        {notice && (
          <p role="status" className="mt-10 mb-0 rounded-card border border-brand/30 bg-brand-soft p-5 text-base leading-relaxed text-ink">
            {notice}
          </p>
        )}

        <div className="mt-12 flex flex-col-reverse gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {step > 0 && (
              <button type="button" onClick={() => go(step - 1)} className="btn-secondary">
                → הקודם
              </button>
            )}
            <button type="button" onClick={saveForLater} className="text-base font-semibold text-body underline underline-offset-4 hover:text-brand">
              לשמור ולהמשיך אחר כך
            </button>
          </div>
          {last ? (
            <button type="button" onClick={submit} disabled={sending} className="btn-accent max-md:w-full max-md:justify-center disabled:opacity-60">
              {sending ? 'שולח…' : 'שליחת השאלון'}
            </button>
          ) : (
            <button type="button" onClick={next} className="btn-accent max-md:w-full max-md:justify-center">
              לשלב הבא ←
            </button>
          )}
        </div>
      </div>
    </Shell>
  )
}

function focusFirstError(errors: Record<string, string>) {
  const id = Object.keys(errors)[0]
  const el = document.getElementById(`q-${id}`)
  el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  el?.querySelector<HTMLElement>('input, textarea, select, button')?.focus({ preventScroll: true })
}

function Shell({ children, save, preview }: { children: React.ReactNode; save?: SaveState; preview?: boolean }) {
  return (
    <div className="min-h-svh">
      <header className="sticky top-0 z-10 border-b border-line bg-muted/90 backdrop-blur">
        <div className="container-site flex h-16 items-center justify-between gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-light-bg.svg" alt="REISS DIGITAL" className="h-7 w-auto" />
          <span aria-live="polite" className="text-sm text-body">
            {preview
              ? 'תצוגה מקדימה'
              : save === 'saving'
                ? 'שומר…'
                : save === 'saved'
                  ? '✓ נשמר'
                  : save === 'error'
                    ? 'לא נשמר, ננסה שוב'
                    : ''}
          </span>
        </div>
      </header>
      <main className="container-site">{children}</main>
    </div>
  )
}

function Progress({ step, total, titles, onJump }: { step: number; total: number; titles: string[]; onJump: (i: number) => void }) {
  return (
    <nav aria-label="שלבי השאלון">
      <p className="m-0 text-sm font-semibold text-body">
        שלב {step + 1} מתוך {total}
      </p>
      <ol className="mt-3 flex list-none gap-1.5 p-0">
        {titles.map((t, i) => (
          <li key={i} className="flex-1">
            <button
              type="button"
              onClick={() => onJump(i)}
              disabled={i >= step}
              aria-label={t}
              aria-current={i === step ? 'step' : undefined}
              className={cn('block h-1.5 w-full rounded-full transition-colors', i <= step ? 'bg-brand' : 'bg-line', i < step && 'cursor-pointer hover:bg-brand-dark')}
            />
          </li>
        ))}
      </ol>
    </nav>
  )
}

const field =
  'w-full rounded-xl border border-line bg-white px-4 py-3.5 text-lg text-ink shadow-[0_1px_0_rgb(13_16_32/0.03)] outline-none transition placeholder:text-body/45 focus:border-brand focus:ring-4 focus:ring-brand/15 aria-[invalid=true]:border-red-600'

function Question({
  q,
  value,
  error,
  onChange,
  children,
}: {
  q: SnapshotQuestion
  value: AnswerValue | undefined
  error?: string
  onChange: (v: AnswerValue) => void
  children?: React.ReactNode
}) {
  const id = `q-${q.id}`
  const describedBy = [q.help && `${id}-help`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
  const text = typeof value === 'string' ? value : ''
  const list = Array.isArray(value) ? (value as string[]) : []
  const grouped = ['radio', 'checkbox', 'yesno', 'file', 'image'].includes(q.type)
  const Label = grouped ? 'legend' : 'label'

  const body = (
    <>
      <Label {...(!grouped ? { htmlFor: `${id}-input` } : {})} className="block p-0 font-display text-xl leading-snug font-bold text-ink">
        {q.label}
        {q.required ? (
          <span className="text-brand" aria-label="חובה">
            {' '}*
          </span>
        ) : (
          <span className="text-sm font-normal text-body/70"> (לא חובה)</span>
        )}
      </Label>
      {q.help && (
        <p id={`${id}-help`} className="mt-1.5 mb-0 text-base leading-relaxed text-body">
          {q.help}
        </p>
      )}
      <div className="mt-4">
        {q.type === 'text' && (
          <input id={`${id}-input`} type="text" value={text} placeholder={q.placeholder} maxLength={5000} onChange={(e) => onChange(e.target.value)} aria-invalid={Boolean(error)} aria-describedby={describedBy} className={field} />
        )}
        {q.type === 'url' && (
          <input id={`${id}-input`} type="url" inputMode="url" dir="ltr" value={text} placeholder={q.placeholder || 'example.co.il'} onChange={(e) => onChange(e.target.value)} aria-invalid={Boolean(error)} aria-describedby={describedBy} className={cn(field, 'text-start')} />
        )}
        {q.type === 'textarea' && (
          <textarea id={`${id}-input`} rows={5} value={text} placeholder={q.placeholder} maxLength={5000} onChange={(e) => onChange(e.target.value)} aria-invalid={Boolean(error)} aria-describedby={describedBy} className={cn(field, 'min-h-36 resize-y leading-relaxed')} />
        )}
        {q.type === 'select' && (
          <select id={`${id}-input`} value={text} onChange={(e) => onChange(e.target.value)} aria-invalid={Boolean(error)} aria-describedby={describedBy} className={cn(field, 'appearance-none bg-[length:1rem] bg-[left_1rem_center] bg-no-repeat')} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3 6l5 5 5-5' fill='none' stroke='%230d1020' stroke-width='1.6'/%3E%3C/svg%3E\")" }}>
            <option value="">בחרו…</option>
            {q.options?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        )}
        {(q.type === 'radio' || q.type === 'yesno') && (
          <div className={cn('grid gap-2.5', q.type === 'yesno' && 'grid-cols-2 md:max-w-sm')}>
            {(q.type === 'yesno' ? ['כן', 'לא'] : (q.options ?? [])).map((o) => (
              <Choice key={o} type="radio" name={id} checked={text === o} onChange={() => onChange(o)} label={o} />
            ))}
          </div>
        )}
        {q.type === 'checkbox' && (
          <div className="grid gap-2.5">
            {q.options?.map((o) => (
              <Choice
                key={o}
                type="checkbox"
                name={id}
                checked={list.includes(o)}
                onChange={(on) => onChange(on ? [...list, o] : list.filter((x) => x !== o))}
                label={o}
              />
            ))}
          </div>
        )}
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2.5 mb-0 text-base font-semibold text-red-700">
          {error}
        </p>
      )}
    </>
  )

  return grouped ? (
    <fieldset id={id} aria-describedby={describedBy} className="m-0 min-w-0 scroll-mt-28 border-0 p-0">
      {body}
    </fieldset>
  ) : (
    <div id={id} className="scroll-mt-28">
      {body}
    </div>
  )
}

function Choice({ type, name, checked, onChange, label }: { type: 'radio' | 'checkbox'; name: string; checked: boolean; onChange: (on: boolean) => void; label: string }) {
  return (
    <label
      className={cn(
        'flex min-h-14 cursor-pointer items-center gap-3.5 rounded-xl border bg-white px-4 py-3 text-lg transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand/20',
        checked ? 'border-brand bg-brand-soft text-ink' : 'border-line text-ink hover:border-ink/30',
      )}
    >
      <input type={type} name={name} checked={checked} onChange={(e) => onChange(e.target.checked)} className="size-5 shrink-0 accent-[var(--color-brand)]" />
      <span>{label}</span>
    </label>
  )
}
