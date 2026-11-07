import type { DefaultServerCellComponentProps, UIFieldServerComponent } from 'payload'
import React from 'react'

import { getServerURL } from '@/utilities/routes'
import { CopyLink, LinkPanel } from './OnboardingLinkClient'

const linkFor = (token?: string | null) => (token ? `${getServerURL()}/onboarding/${token}` : null)

/** Sidebar of a client: their questionnaire link, to copy or replace. */
export const OnboardingLink: UIFieldServerComponent = ({ data, id }) => {
  if (!id) {
    return <p style={{ margin: '0 0 1.5rem', opacity: 0.7 }}>הקישור לשאלון ייווצר אחרי השמירה הראשונה.</p>
  }
  return <LinkPanel id={String(id)} url={linkFor(data?.token)} active={data?.linkActive !== false && !data?.archived} />
}

/** Clients list: a copy button per row. */
export function OnboardingLinkCell({ rowData }: DefaultServerCellComponentProps) {
  const url = linkFor(rowData?.token as string | undefined)
  if (!url || rowData?.linkActive === false || rowData?.archived) return <span style={{ opacity: 0.5 }}>—</span>
  return <CopyLink url={url} compact />
}
