import React from 'react'

import type { Media as MediaDoc } from '@/payload-types'
import { getSignatureStrokes } from '@/utilities/signatureStrokes'
import { SignatureClient } from './SignatureClient'

type Props = {
  /** Uploaded signature (transparent PNG). Takes precedence over `text`. */
  image?: MediaDoc | number | null
  /** Rendered in a handwriting font when no image is uploaded. */
  text?: string | null
  /** Height and colour (the ink uses currentColor), e.g. "h-16 text-white". */
  className?: string
  /** Extra wait before the pen starts, e.g. to follow a heading's entrance. */
  startDelayMs?: number
}

/**
 * A handwritten signature that writes itself when scrolled into view.
 * An uploaded image is split into its pen strokes on the server and drawn
 * stroke by stroke, right to left, at a natural writing pace.
 */
export async function Signature({ image, text, className, startDelayMs = 0 }: Props) {
  const doc = image && typeof image === 'object' ? image : null
  const strokes = doc?.filename ? await getSignatureStrokes(doc.filename, doc.updatedAt) : null

  return (
    <SignatureClient
      strokes={strokes}
      image={doc}
      text={text}
      className={className}
      startDelayMs={startDelayMs}
    />
  )
}
