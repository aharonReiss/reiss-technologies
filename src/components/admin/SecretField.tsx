'use client'

import { FieldError, FieldLabel, toast, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import React, { useState } from 'react'

const iconButton: React.CSSProperties = {
  border: '1px solid var(--theme-elevation-150)',
  background: 'var(--theme-elevation-50)',
  color: 'var(--theme-text)',
  borderRadius: 'var(--style-radius-s)',
  padding: '0 0.75rem',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
}

/**
 * A text field with a copy button; with `secret`, also hidden until shown.
 * Used for system access details (usernames and encrypted passwords).
 */
export const SecretField: TextFieldClientComponent = (props) => {
  const { path, field } = props
  const secret = Boolean((props as { secret?: boolean }).secret)
  const { value, setValue, showError, errorMessage } = useField<string>({ path })
  const [shown, setShown] = useState(false)

  const copy = async () => {
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
      toast.success('הועתק')
    } catch {
      toast.error('ההעתקה נכשלה')
    }
  }

  return (
    <div className="field-type text" style={{ flex: '1 1 0', minWidth: 0 }}>
      <FieldLabel label={field.label} required={field.required} path={path} />
      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'stretch' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <input
            id={`field-${path.replace(/\./g, '__')}`}
            name={path}
            value={value ?? ''}
            onChange={(e) => setValue(e.target.value)}
            type={secret && !shown ? 'password' : 'text'}
            autoComplete={secret ? 'new-password' : 'off'}
            dir="ltr"
            spellCheck={false}
            style={{
              width: '100%',
              height: '100%',
              minHeight: 40,
              padding: '0 0.75rem',
              border: `1px solid ${showError ? 'var(--theme-error-500)' : 'var(--theme-elevation-150)'}`,
              borderRadius: 'var(--style-radius-s)',
              background: 'var(--theme-input-bg, var(--theme-elevation-0))',
              color: 'var(--theme-text)',
              fontFamily: secret && shown ? 'monospace' : undefined,
            }}
          />
          {showError && <FieldError path={path} message={errorMessage} showError />}
        </div>
        {secret && (
          <button type="button" style={iconButton} onClick={() => setShown((s) => !s)} aria-label={shown ? 'הסתרה' : 'הצגה'}>
            {shown ? 'הסתרה' : 'הצגה'}
          </button>
        )}
        <button type="button" style={iconButton} onClick={copy} disabled={!value}>
          העתקה
        </button>
      </div>
    </div>
  )
}
