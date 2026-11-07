import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { he } from '@payloadcms/translations/languages/he'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { authenticated } from './access'
import { Categories } from './collections/Categories'
import { ClientFiles } from './collections/ClientFiles'
import { ClientProfiles } from './collections/ClientProfiles'
import { Clients } from './collections/Clients'
import { FAQs } from './collections/FAQs'
import { Leads } from './collections/Leads'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { Services } from './collections/Services'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { richTextEditor } from './fields/richText'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Questionnaire } from './globals/Questionnaire'
import { SiteSettings } from './globals/SiteSettings'
import { revalidateHooks } from './hooks/revalidate'
import { docPath, getServerURL, linkableCollections } from './utilities/routes'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const smtpConfigured = Boolean(process.env.SMTP_HOST)

export default buildConfig({
  serverURL: getServerURL(),
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' | REISS DIGITAL' },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { label: 'מובייל', name: 'mobile', width: 390, height: 844 },
        { label: 'טאבלט', name: 'tablet', width: 820, height: 1180 },
        { label: 'דסקטופ', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  i18n: {
    supportedLanguages: { he },
    fallbackLanguage: 'he',
    // The redirects plugin ships no Hebrew strings.
    translations: {
      he: {
        'plugin-redirects': {
          fromUrl: 'מכתובת',
          toUrlType: 'סוג יעד',
          internalLink: 'עמוד באתר',
          customUrl: 'כתובת מותאמת',
          documentToRedirect: 'עמוד יעד',
          redirectType: 'סוג הפניה',
        },
      },
    },
  },
  collections: [
    Pages,
    Services,
    Projects,
    Posts,
    Categories,
    Testimonials,
    FAQs,
    Clients,
    Media,
    Leads,
    Users,
    ClientProfiles,
    ClientFiles,
  ],
  globals: [Header, Footer, SiteSettings, Questionnaire],
  editor: richTextEditor,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  email: smtpConfigured
    ? nodemailerAdapter({
        defaultFromAddress: process.env.SMTP_FROM_ADDRESS || 'no-reply@reiss-technologies.co.il',
        defaultFromName: process.env.SMTP_FROM_NAME || 'REISS DIGITAL',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        },
      })
    : undefined,
  sharp,
  plugins: [
    seoPlugin({
      // Fields are placed manually in each collection's SEO tab (src/fields/seo.ts).
      generateTitle: ({ doc }) => doc?.title ?? '',
      generateURL: ({ doc, collectionConfig }) =>
        `${getServerURL()}${docPath(collectionConfig?.slug ?? 'pages', doc?.slug)}`,
    }),
    redirectsPlugin({
      collections: linkableCollections,
      redirectTypes: ['301', '302'],
      overrides: {
        labels: { singular: 'הפניה', plural: 'הפניות' },
        access: {
          create: authenticated,
          read: () => true,
          update: authenticated,
          delete: authenticated,
        },
        admin: { group: 'הגדרות' },
        hooks: revalidateHooks,
      },
    }),
  ],
})
