/** Minimal builders for Lexical rich-text JSON, used by the seed. */

const base = { format: '', indent: 0, version: 1, direction: 'rtl' as const }

const text = (value: string, bold = false) => ({
  type: 'text',
  text: value,
  format: bold ? 1 : 0,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

/** `**bold**` segments inside a string become bold text nodes. */
const inline = (value: string) =>
  value
    .split(/\*\*([^*]+)\*\*/g)
    .map((part, i) => text(part, i % 2 === 1))
    .filter((n) => n.text)

export const p = (value: string) => ({
  ...base,
  type: 'paragraph',
  textFormat: 0,
  textStyle: '',
  children: inline(value),
})

export const h = (tag: 'h2' | 'h3', value: string) => ({
  ...base,
  type: 'heading',
  tag,
  children: [text(value)],
})

export const ul = (items: string[]) => ({
  ...base,
  type: 'list',
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  children: items.map((item, i) => ({ ...base, type: 'listitem', value: i + 1, children: inline(item) })),
})

export const quote = (value: string) => ({ ...base, type: 'quote', children: inline(value) })

type Node = { type: string; version: number; [k: string]: unknown }

export const doc = (...children: Node[]) => ({
  root: { ...base, format: '' as const, type: 'root', children },
})
