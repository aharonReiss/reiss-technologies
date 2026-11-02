import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as LexicalRichText,
} from '@payloadcms/richtext-lexical/react'
import React from 'react'

import { cn } from '@/utilities/cn'
import { docPath } from '@/utilities/routes'

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({
    internalDocToHref: ({ linkNode }) => {
      const doc = linkNode.fields.doc
      if (!doc || typeof doc.value !== 'object') return '/'
      return docPath(doc.relationTo, (doc.value as { slug?: string }).slug)
    },
  }),
})

type Props = {
  data?: SerializedEditorState | null
  className?: string
}

export function RichText({ data, className }: Props) {
  if (!data) return null
  return (
    <LexicalRichText
      data={data}
      converters={converters}
      className={cn('prose-site', className)}
    />
  )
}
