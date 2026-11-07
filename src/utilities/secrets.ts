import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

/**
 * Field encryption for stored passwords: AES-256-GCM with a key that lives only
 * in the server's environment (CREDENTIALS_KEY, 32 bytes as base64), never in the
 * database. Stored form: "enc:v1:<iv>:<tag>:<data>", all base64.
 */
const PREFIX = 'enc:v1:'

function key(): Buffer {
  const raw = process.env.CREDENTIALS_KEY
  const k = raw ? Buffer.from(raw, 'base64') : null
  if (!k || k.length !== 32) {
    throw new Error('CREDENTIALS_KEY חסר או לא תקין ב־.env (32 בתים ב־base64). ראו .env.example')
  }
  return k
}

export const isEncrypted = (v: unknown): v is string => typeof v === 'string' && v.startsWith(PREFIX)

export function encrypt(plain: string): string {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key(), iv)
  const data = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
  return PREFIX + [iv, cipher.getAuthTag(), data].map((b) => b.toString('base64')).join(':')
}

export function decrypt(stored: string): string {
  const [iv, tag, data] = stored.slice(PREFIX.length).split(':').map((s) => Buffer.from(s, 'base64'))
  const decipher = createDecipheriv('aes-256-gcm', key(), iv)
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8')
}
