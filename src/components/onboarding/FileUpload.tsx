'use client'

import React, { useRef, useState } from 'react'

import { ACCEPT, FILE_TYPES, IMAGE_TYPES, type SnapshotQuestion, type UploadedFile } from '@/onboarding/types'
import { cn } from '@/utilities/cn'

type Props = {
  token: string
  preview?: boolean
  question: SnapshotQuestion
  maxSizeMB: number
  files: UploadedFile[]
  onAdded: (f: UploadedFile) => void
  /** Resolves false when the file could not be removed. */
  onRemove: (f: UploadedFile) => Promise<boolean>
}

type Pending = { key: string; name: string; progress: number; error?: string }

const size = (n: number) => (n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`)

/** Some browsers leave the type empty for HEIC and design files; the extension decides there. */
const typeOf = (f: File) => {
  if (f.type) return f.type
  const ext = f.name.split('.').pop()?.toLowerCase()
  return (
    { heic: 'image/heic', heif: 'image/heif', ai: 'application/postscript', eps: 'application/postscript', psd: 'image/vnd.adobe.photoshop' }[ext ?? ''] ??
    ''
  )
}

/**
 * Upload area for one question: drop files or pick them, each one uploads on its
 * own with a progress bar, then shows as a thumbnail (images) or a file row.
 * Files can be removed until the questionnaire is sent. The server checks type
 * and size again; the checks here only save a wasted upload.
 */
export function FileUpload({ token, preview, question, maxSizeMB, files, onAdded, onRemove }: Props) {
  const input = useRef<HTMLInputElement>(null)
  const [over, setOver] = useState(false)
  const [pending, setPending] = useState<Pending[]>([])
  const [removing, setRemoving] = useState<number | null>(null)
  const images = question.type === 'image'
  const allowed = images ? IMAGE_TYPES : FILE_TYPES
  const single = !question.multiple
  const full = single && files.length > 0

  const update = (key: string, patch: Partial<Pending>) =>
    setPending((all) => all.map((p) => (p.key === key ? { ...p, ...patch } : p)))

  const upload = (file: File) => {
    const key = `${file.name}-${file.size}-${Math.random()}`
    const type = typeOf(file)
    const error = !allowed.includes(type)
      ? images
        ? 'אפשר להעלות כאן רק תמונות'
        : 'סוג קובץ לא נתמך. אפשר לשלוח בתוך ZIP'
      : file.size > maxSizeMB * 1024 * 1024
        ? `הקובץ גדול מ־${maxSizeMB}MB`
        : undefined
    setPending((all) => [...all, { key, name: file.name, progress: 0, error }])
    if (error) return

    if (preview) {
      update(key, { error: 'בתצוגה המקדימה קבצים לא נשמרים' })
      return
    }

    const body = new FormData()
    body.append('questionId', question.id)
    body.append('file', type === file.type ? file : new File([file], file.name, { type }))
    const xhr = new XMLHttpRequest()
    xhr.open('POST', `/onboarding/${encodeURIComponent(token)}/upload`)
    xhr.upload.onprogress = (e) => e.lengthComputable && update(key, { progress: e.loaded / e.total })
    xhr.onload = () => {
      let res: (UploadedFile & { error?: string }) | null = null
      try {
        res = JSON.parse(xhr.responseText)
      } catch {}
      if (xhr.status === 200 && res?.id) {
        setPending((all) => all.filter((p) => p.key !== key))
        onAdded(res)
      } else {
        update(key, { error: res?.error || (xhr.status === 413 ? 'הקובץ גדול מדי' : 'ההעלאה נכשלה. נסו שוב') })
      }
    }
    xhr.onerror = () => update(key, { error: 'ההעלאה נכשלה. בדקו את החיבור ונסו שוב' })
    xhr.send(body)
  }

  const take = (list: FileList | null) => {
    if (!list?.length || full) return
    Array.from(list)
      .slice(0, single ? 1 : undefined)
      .forEach(upload)
    if (input.current) input.current.value = ''
  }

  const remove = async (f: UploadedFile) => {
    setRemoving(f.id)
    await onRemove(f)
    setRemoving(null)
  }

  return (
    <div>
      {!full && (
        <label
          onDragOver={(e) => {
            e.preventDefault()
            setOver(true)
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setOver(false)
            take(e.dataTransfer.files)
          }}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed bg-white px-6 py-9 text-center transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand/20',
            over ? 'border-brand bg-brand-soft' : 'border-line hover:border-brand/60',
          )}
        >
          <span aria-hidden className="grid size-12 place-items-center rounded-full bg-brand-soft text-2xl text-brand">
            ↑
          </span>
          <span className="font-display text-lg font-bold text-ink">
            {images ? 'גררו תמונות לכאן' : 'גררו קבצים לכאן'} <span className="font-normal text-body">או</span>{' '}
            <span className="text-brand underline underline-offset-4">בחרו מהמכשיר</span>
          </span>
          <span className="text-sm text-body">
            {images ? 'JPG, PNG, WEBP, HEIC' : 'תמונות, PDF, Word, Excel, PowerPoint, ZIP, AI, PSD'} · עד {maxSizeMB}MB לקובץ
            {single ? ' · קובץ אחד' : ''}
          </span>
          <input
            ref={input}
            type="file"
            multiple={!single}
            accept={images ? ACCEPT.image : ACCEPT.file}
            onChange={(e) => take(e.target.files)}
            className="sr-only"
          />
        </label>
      )}

      {(files.length > 0 || pending.length > 0) && (
        <ul className={cn('mt-4 grid list-none gap-3 p-0', images && 'grid-cols-2 sm:grid-cols-3')}>
          {files.map((f) => (
            <li key={f.id} className={cn('relative overflow-hidden rounded-xl border border-line bg-white', !images && 'flex items-center gap-3 p-3')}>
              {f.isImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview ? '' : `/onboarding/${encodeURIComponent(token)}/file/${f.id}?size=thumbnail`}
                  alt={f.name}
                  className={cn('block object-cover', images ? 'aspect-square w-full' : 'size-12 shrink-0 rounded-lg')}
                />
              ) : (
                <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-lg bg-brand-soft text-xs font-bold text-brand uppercase">
                  {f.name.split('.').pop()?.slice(0, 4)}
                </span>
              )}
              <div className={cn('min-w-0 flex-1', images && 'px-3 py-2')}>
                <p className="m-0 truncate text-sm font-semibold text-ink" dir="auto">
                  {f.name}
                </p>
                <p className="m-0 text-xs text-body">{size(f.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => remove(f)}
                disabled={removing === f.id}
                aria-label={`הסרת ${f.name}`}
                className={cn(
                  'grid size-9 shrink-0 place-items-center rounded-full bg-white/95 text-lg text-ink shadow ring-1 ring-line transition hover:bg-red-50 hover:text-red-700 disabled:opacity-50',
                  images && 'absolute end-2 top-2',
                )}
              >
                ×
              </button>
            </li>
          ))}
          {pending.map((p) => (
            <li key={p.key} className={cn('rounded-xl border bg-white p-3', p.error ? 'border-red-300' : 'border-line', images && 'col-span-full')}>
              <div className="flex items-center justify-between gap-3">
                <p className="m-0 min-w-0 truncate text-sm font-semibold text-ink" dir="auto">
                  {p.name}
                </p>
                {p.error ? (
                  <button
                    type="button"
                    onClick={() => setPending((all) => all.filter((x) => x.key !== p.key))}
                    aria-label="סגירה"
                    className="text-lg text-body hover:text-ink"
                  >
                    ×
                  </button>
                ) : (
                  <span className="text-xs text-body tabular-nums">{Math.round(p.progress * 100)}%</span>
                )}
              </div>
              {p.error ? (
                <p role="alert" className="mt-1 mb-0 text-sm font-semibold text-red-700">
                  {p.error}
                </p>
              ) : (
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={Math.round(p.progress * 100)} aria-valuemin={0} aria-valuemax={100} aria-label={`מעלה את ${p.name}`}>
                  <div className="h-full rounded-full bg-brand transition-[width]" style={{ width: `${p.progress * 100}%` }} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      {full && <p className="mt-3 mb-0 text-sm text-body">כדי להחליף, הסירו את הקובץ והעלו חדש.</p>}
    </div>
  )
}
