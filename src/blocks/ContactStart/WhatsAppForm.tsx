'use client'

import React, { useEffect, useId, useRef, useState } from 'react'

import { Icon } from '@/components/Icon'
import { cn } from '@/utilities/cn'
import { track } from '@/utilities/track'

type Props = {
  /** Digits only, international format; null when Site Settings has none. */
  number: string | null
  projectTypes: string[]
  greeting: string
  signoff: string
  directMessage: string
}

type Values = { name: string; phone: string; type: string; about: string }
const EMPTY: Values = { name: '', phone: '', type: '', about: '' }
const STORE = 'reiss-contact-draft'

/** Israeli and international numbers: spaces, hyphens, dots and brackets are fine. */
const phoneOk = (v: string) => /^\+?\d{9,15}$/.test(v.replace(/[\s\-().]/g, ''))
const errorsOf = (v: Values) => ({
  name: v.name.trim() ? '' : 'נשמח לדעת איך קוראים לכם.',
  phone: !v.phone.trim() ? 'נשמח למספר טלפון כדי שנוכל לחזור אליכם.' : phoneOk(v.phone) ? '' : 'נראה שמספר הטלפון לא תקין.',
})
const waUrl = (number: string, text: string) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`

/**
 * Four fields that become a WhatsApp message the visitor reviews and sends
 * themselves – nothing is sent to a server, so the page never claims success.
 * Errors appear only for fields the visitor has left (or on submit), and the
 * draft survives a trip to WhatsApp and back (sessionStorage, per tab).
 */
export function WhatsAppForm({ number, projectTypes, greeting, signoff, directMessage }: Props) {
  const id = useId()
  const [v, setV] = useState<Values>(EMPTY)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [opened, setOpened] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const about = useRef<HTMLTextAreaElement>(null)

  // Restore a draft after the visitor comes back from WhatsApp. Saving waits until
  // the restore has run, so an empty first render never overwrites the draft.
  const restored = useRef(false)
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORE)
      const draft: Values = saved ? { ...EMPTY, ...JSON.parse(saved) } : { ...EMPTY }
      // The project type follows the button the visitor came from: a service's own
      // button sends ?type=…; any other way in starts with nothing chosen.
      const wanted = new URLSearchParams(window.location.search).get('type')
      draft.type = wanted && projectTypes.includes(wanted) ? wanted : ''
      if (!restored.current) setV(draft)
    } catch {}
    restored.current = true
  }, [])
  useEffect(() => {
    try {
      if (restored.current) sessionStorage.setItem(STORE, JSON.stringify(v))
    } catch {}
    // The description grows with what is written.
    const t = about.current
    if (t) {
      t.style.height = 'auto'
      t.style.height = `${t.scrollHeight}px`
    }
  }, [v])

  const errors = errorsOf(v)
  const show = (k: 'name' | 'phone') => (touched[k] ? errors[k] : '')
  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setV((s) => ({ ...s, [k]: e.target.value }))
  const leave = (k: string) => () => setTouched((s) => ({ ...s, [k]: true }))

  // Only what the visitor filled in: empty optional fields leave no line behind.
  const message = () => {
    const lines: string[] = []
    if (greeting) lines.push(greeting, '')
    lines.push(`שם: ${v.name.trim()}`, `טלפון: ${v.phone.trim()}`)
    if (v.type) lines.push(`סוג הפרויקט: ${v.type}`)
    if (v.about.trim()) lines.push(`קצת על הרעיון: ${v.about.trim()}`)
    if (signoff) lines.push('', signoff)
    return lines.join('\n')
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, phone: true })
    if (errors.name || errors.phone) {
      document.getElementById(`${id}-${errors.name ? 'name' : 'phone'}`)?.focus()
      return
    }
    if (!number) return
    const url = waUrl(number, message())
    // The lead: the form is filled and WhatsApp opens with the message (sending is the visitor's last tap).
    track('generate_lead', { form_type: 'whatsapp_form', project_type: v.type || undefined })
    setOpened(url)
    setCopied(false)
    // A new tab where allowed; where popups are blocked (some phones), the same tab.
    const w = window.open(url, '_blank', 'noopener')
    if (!w) window.location.href = url
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message())
      setCopied(true)
    } catch {}
  }

  const field =
    'block w-full rounded-none border-0 border-b-2 border-ink/15 bg-transparent px-0 py-2 text-[1.0625rem] md:py-3 md:text-lg text-ink placeholder:text-ink/40 transition-colors outline-none focus:border-brand aria-[invalid=true]:border-ink'
  const label = 'block font-display text-[0.95rem] font-semibold text-ink md:text-[1.05rem]'

  return (
    // data-wa-avoid: the floating WhatsApp button steps aside while the form is on screen.
    <form noValidate onSubmit={submit} data-wa-avoid className="grid gap-[1.1rem] md:gap-8">
      <div>
        <label htmlFor={`${id}-name`} className={label}>
          איך קוראים לכם?
        </label>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-required="true"
          aria-invalid={!!show('name')}
          aria-describedby={show('name') ? `${id}-name-err` : undefined}
          value={v.name}
          onChange={set('name')}
          onBlur={leave('name')}
          className={field}
        />
        <FieldError id={`${id}-name-err`} text={show('name')} />
      </div>

      <div>
        <label htmlFor={`${id}-phone`} className={label}>
          מה מספר הטלפון שלכם?
        </label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          required
          aria-required="true"
          aria-invalid={!!show('phone')}
          aria-describedby={show('phone') ? `${id}-phone-err` : undefined}
          value={v.phone}
          onChange={set('phone')}
          onBlur={leave('phone')}
          className={cn(field, 'text-right')}
        />
        <FieldError id={`${id}-phone-err`} text={show('phone')} />
      </div>

      {projectTypes.length > 0 && (
        <div>
          <label htmlFor={`${id}-type`} className={label}>
            מה הייתם רוצים לבנות? <span className="font-sans text-sm font-normal text-body">(לא חובה)</span>
          </label>
          <div className="relative">
            <select
              id={`${id}-type`}
              name="type"
              value={v.type}
              onChange={set('type')}
              className={cn(field, 'cursor-pointer appearance-none pe-0 ps-8', !v.type && 'text-ink/45')}
            >
              <option value="">בחרו סוג פרויקט</option>
              {projectTypes.map((t) => (
                <option key={t} value={t} className="text-ink">
                  {t}
                </option>
              ))}
            </select>
            <svg aria-hidden viewBox="0 0 16 16" className="pointer-events-none absolute top-1/2 left-1 size-4 -translate-y-1/2 text-ink/60" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="m3.5 6 4.5 4.5L12.5 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      )}

      <div>
        <label htmlFor={`${id}-about`} className={label}>
          ספרו לנו קצת על הרעיון <span className="font-sans text-sm font-normal text-body">(לא חובה)</span>
        </label>
        <textarea
          ref={about}
          id={`${id}-about`}
          name="about"
          rows={1}
          value={v.about}
          onChange={set('about')}
          placeholder="כמה מילים על העסק או על מה שחשבתם לבנות. לא צריך אפיון מסודר :)"
          className={cn(field, 'min-h-[3.4rem] md:min-h-[5.5rem] resize-none overflow-hidden leading-[1.6]')}
        />
      </div>

      <div className="grid gap-3 pt-1 md:gap-4">
        <button
          type="submit"
          disabled={!number}
          className="btn-primary min-h-14 w-full justify-center gap-3 text-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:w-auto sm:justify-self-start sm:px-10"
        >
          <Icon name="whatsapp" className="size-5" />
          ממשיכים לוואטסאפ
          <span aria-hidden>←</span>
        </button>

        {!number && (
          // Never a placeholder number: say plainly that the channel is not connected yet.
          <p role="status" className="m-0 text-sm leading-relaxed text-ink">
            ערוץ הוואטסאפ עדיין לא מחובר באתר, ולכן אי אפשר להמשיך כרגע.
          </p>
        )}

        {opened && (
          // Opening WhatsApp is not sending: the visitor still presses send there.
          <div role="status" className="border-s-2 border-brand ps-4 text-[0.95rem] leading-relaxed text-ink">
            <p className="m-0">פתחנו את וואטסאפ עם ההודעה מוכנה. כדי שנקבל אותה, צריך ללחוץ שם על שליחה.</p>
            <p className="m-0 mt-2 flex flex-wrap gap-x-5 gap-y-1">
              <a href={opened} data-track="off" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-4">
                לא נפתח? נסו שוב
              </a>
              <button type="button" onClick={copy} className="font-semibold text-brand underline underline-offset-4">
                {copied ? 'ההודעה הועתקה' : 'העתקת ההודעה'}
              </button>
            </p>
          </div>
        )}

        {number && (
          <p className="m-0 text-[0.95rem] text-body">
            מעדיפים פשוט לכתוב לנו?{' '}
            <a
              href={waUrl(number, directMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:text-brand hover:decoration-brand"
            >
              פתחו שיחה בוואטסאפ
            </a>
          </p>
        )}
      </div>
    </form>
  )
}

function FieldError({ id, text }: { id: string; text: string }) {
  // Always rendered so screen readers hear the message when it appears; text, not colour, carries it.
  return (
    <p id={id} aria-live="polite" className={cn('m-0 text-sm font-medium text-ink', text && 'mt-2')}>
      {text && (
        <>
          <span aria-hidden className="me-1.5 inline-grid size-4 place-items-center rounded-full bg-ink text-[0.65rem] leading-none font-bold text-white">
            !
          </span>
          {text}
        </>
      )}
    </p>
  )
}
