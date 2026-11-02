import type { SelectField } from 'payload'

/** Icons available to editors. Values map to <Icon name> in src/components/Icon.tsx. */
export const iconOptions = [
  { label: 'קוד / פיתוח', value: 'code' },
  { label: 'עיצוב', value: 'design' },
  { label: 'חנות', value: 'cart' },
  { label: 'דף נחיתה', value: 'rocket' },
  { label: 'SEO / חיפוש', value: 'search' },
  { label: 'מובייל', value: 'mobile' },
  { label: 'תחזוקה', value: 'wrench' },
  { label: 'שיווק', value: 'megaphone' },
  { label: 'מערכת / שכבות', value: 'layers' },
  { label: 'חברה / משרד', value: 'building' },
  { label: 'לימודים / הכשרה', value: 'school' },
  { label: 'שדרוג / רענון', value: 'refresh' },
  { label: 'עסק / תיק', value: 'briefcase' },
  { label: 'משתמשים', value: 'users' },
]

export const iconField = (overrides: Partial<SelectField> = {}): SelectField => ({
  name: 'icon',
  type: 'select',
  label: 'אייקון',
  defaultValue: 'code',
  options: iconOptions,
  ...overrides,
} as SelectField)
