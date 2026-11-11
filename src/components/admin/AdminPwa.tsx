'use client'

import React, { useEffect } from 'react'

/**
 * Registers the admin's service worker (public/admin-pwa/sw.js, scope /admin),
 * which together with the manifest makes the admin installable as an app.
 */
export function AdminPwa({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    navigator.serviceWorker.register('/admin-pwa/sw.js', { scope: '/admin' }).catch(() => {})
  }, [])
  return <>{children}</>
}
