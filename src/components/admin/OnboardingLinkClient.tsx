'use client'

import { Button, toast } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

/** Copies the link; in the list it is a small button that does not open the row. */
export function CopyLink({ url, compact }: { url: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false)
  const copy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success('הקישור הועתק')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('העתיקו את הקישור:', url)
    }
  }
  return (
    <Button buttonStyle={compact ? 'pill' : 'primary'} size={compact ? 'small' : 'medium'} onClick={copy} margin={false}>
      {copied ? '✓ הועתק' : 'העתקת קישור'}
    </Button>
  )
}

/** The link, copy, and a new link that replaces the old one (after a confirmation). */
export function LinkPanel({ id, url, active }: { id: string; url: string | null; active: boolean }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)

  const regenerate = async () => {
    if (!window.confirm('ליצור קישור חדש? הקישור הקודם יפסיק לעבוד מיד. התשובות והקבצים נשמרים.')) return
    setBusy(true)
    const res = await fetch(`/api/client-profiles/${id}/regenerate-token`, { method: 'POST', credentials: 'include' })
    setBusy(false)
    if (res.ok) {
      toast.success('נוצר קישור חדש')
      router.refresh()
    } else toast.error('יצירת הקישור נכשלה')
  }

  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>קישור לשאלון</div>
      {url && (
        <input
          readOnly
          value={url}
          dir="ltr"
          onFocus={(e) => e.currentTarget.select()}
          style={{
            width: '100%',
            padding: '0.5rem 0.65rem',
            fontSize: '0.8rem',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: 'var(--style-radius-s)',
            background: 'var(--theme-elevation-50)',
            color: 'var(--theme-text)',
            opacity: active ? 1 : 0.5,
          }}
        />
      )}
      {!active && (
        <p style={{ margin: '0.5rem 0 0', color: 'var(--theme-error-500)' }}>
          הקישור מושבת. הלקוח לא יכול להיכנס עד שמפעילים אותו שוב.
        </p>
      )}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
        {url && active && <CopyLink url={url} />}
        <Button buttonStyle="secondary" onClick={regenerate} disabled={busy} margin={false}>
          {busy ? 'יוצר…' : 'קישור חדש'}
        </Button>
      </div>
    </div>
  )
}
