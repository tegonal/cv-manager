import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { OAuth2Plugin } from 'payload-oauth2'
import { de } from 'payload/i18n/de'
import { en } from 'payload/i18n/en'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { seedDevData } from '@/config/seed/dev-data'
import { seedDevUser } from '@/config/seed/dev-user'
import { Companies } from '@/payload/collections/Companies'
import { CV } from '@/payload/collections/CVs'
import { Languages } from '@/payload/collections/Languages'
import { Levels } from '@/payload/collections/Level'
import { Media } from '@/payload/collections/Media'
import { Organisations } from '@/payload/collections/Organisations'
import { Projects } from '@/payload/collections/Projects'
import { SkillGroups } from '@/payload/collections/SkillGroups'
import { Skills } from '@/payload/collections/Skills'
import { Users } from '@/payload/collections/Users'
import { cvPdfPlugin } from '@/payload/plugins/cv-pdf-generator/plugin'

import { migrations as mongodbMigrations } from './src/migrations/mongodb'
import { migrations as postgresMigrations } from './src/migrations/postgres'
import { migrations as sqliteMigrations } from './src/migrations/sqlite'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const determineDatabase = (url?: string) => {
  if (url?.startsWith('postgres://')) {
    return postgresAdapter({
      migrationDir: './src/migrations/postgres',
      pool: {
        connectionString: url,
      },
      prodMigrations: postgresMigrations,
    })
  } else if (url?.startsWith('mongodb://')) {
    return mongooseAdapter({
      migrationDir: './src/migrations/mongodb',
      url: url,
    })
  } else if (url?.startsWith('file://')) {
    return sqliteAdapter({
      client: {
        url: url,
      },
      migrationDir: './src/migrations/sqlite',
      prodMigrations: sqliteMigrations,
    })
  } else {
    console.log('No supported database configured, default to sqlite')
    return sqliteAdapter({
      client: {
        url: 'file:///tmp/cv-manager.db',
      },
      migrationDir: './src/migrations/sqlite',
      prodMigrations: sqliteMigrations,
    })
  }
}

export default buildConfig({
  admin: {
    ...(process.env.NODE_ENV !== 'production'
      ? {
          autoLogin: {
            email: 'admin@test.com',
            password: 'admin',
            prefillOnly: true,
          },
        }
      : {}),
    components: {
      afterLogin: ['src/payload/components/oauth-server-login-button#OAuthServerLoginButton'],
      graphics: {
        // shown in the nav bar
        Icon: 'src/graphics/Icon/index.tsx#Icon',
        // shown on the signup login page
        Logo: 'src/graphics/Logo/index.tsx#Logo',
      },
    },
    meta: {
      description: 'Curriculum vitae manager app',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/favicon.svg',
        },
      ],
      openGraph: {
        description: 'CV Manager app',
        images: [
          {
            height: 800,
            url: '/ogImage.png',
            width: 800,
          },
        ],
        siteName: undefined,
        title: 'CV Manager',
      },
      titleSuffix: '- CV Manager',
    },
    user: Users.slug,
  },
  collections: [
    CV,
    Users,
    Skills,
    SkillGroups,
    Languages,
    Levels,
    Companies,
    Projects,
    Media,
    Organisations,
  ],
  db: determineDatabase(process.env.DATABASE_URI),
  editor: lexicalEditor(),
  email: process.env.SMTP_HOST
    ? nodemailerAdapter({
        defaultFromAddress: process.env.SMTP_FROM_ADDRESS || '',
        defaultFromName: process.env.SMTP_FROM_ADDRESS || '',
        transportOptions: {
          auth: {
            pass: process.env.SMTP_PASS || '',
            user: process.env.SMTP_USER || '',
          },
          host: process.env.SMTP_HOST || '',
          port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
        },
      })
    : undefined,
  i18n: {
    supportedLanguages: { de, en },
  },
  localization: {
    defaultLocale: 'de',
    fallback: true,
    locales: [
      {
        code: 'en',
        label: 'English',
      },
      {
        code: 'de',
        label: 'Deutsch',
      },
    ],
  },
  logger: {
    options: {
      level: (process.env.NODE_ENV === 'production' ? 'warn' : 'info') as string,
    },
  },
  async onInit(payload) {
    await seedDevUser(payload)
    await seedDevData(payload)
  },
  plugins: [
    s3Storage({
      bucket: process.env.S3_BUCKET || '',
      collections: {
        media: { prefix: 'media' },
      },
      config: {
        bucketEndpoint: false,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        endpoint: process.env.S3_ENDPOINT || '',
        forcePathStyle: true,
        region: 'auto', // Cloudflare R2 specific
      },
      enabled: process.env.S3_ENDPOINT !== undefined,
    }),
    cvPdfPlugin({
      collections: [CV.slug],
      templatePath: './data/cv-pdf/templates',
    }),
    OAuth2Plugin({
      authCollection: Users.slug,
      clientId: process.env.OAUTH_CLIENT_ID || '',
      clientSecret: process.env.OAUTH_CLIENT_SECRET || '',
      enabled: process.env.OAUTH_ENABLED === 'true' || false,
      failureRedirect: (req, error) => {
        console.error({ error, msg: 'failureRedirect' })
        return '/oauth-error'
      },
      getUserInfo: async (accessToken) => {
        try {
          const response = await fetch(process.env.OAUTH_USERINFO_ENDPOINT || '', {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          const user = await response.json()
          return {
            email: user.email,
            sub: user.sub,
          }
        } catch (error) {
          console.error(error)
          return {}
        }
      },
      providerAuthorizationUrl: process.env.OAUTH_AUTHORIZE_ENDPOINT || '',
      scopes: ['email', 'profile', 'openid'],
      serverURL: process.env.PUBLIC_URL || 'http://localhost:3000',
      strategyName: 'oauth2',
      successRedirect: () => {
        console.log('Login successful, redirecting to /admin')
        return '/admin'
      },
      tokenEndpoint: process.env.OAUTH_TOKEN_ENDPOINT || '',
      useEmailAsIdentity: true,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.PUBLIC_URL || 'http://localhost:3000',
  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable
  sharp,
  telemetry: false,
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  typescript: {
    outputFile: path.resolve(dirname, 'src', 'types', 'payload-types.ts'),
  },
})
