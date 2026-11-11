import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  // The installable admin: its service worker lives in /admin-pwa but controls /admin,
  // and is always fetched fresh so an update reaches the installed app.
  async headers() {
    return [
      {
        source: '/admin-pwa/sw.js',
        headers: [
          { key: 'Service-Worker-Allowed', value: '/admin' },
          { key: 'Cache-Control', value: 'no-cache' },
        ],
      },
      {
        source: '/admin-pwa/manifest.webmanifest',
        headers: [{ key: 'Content-Type', value: 'application/manifest+json' }],
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
