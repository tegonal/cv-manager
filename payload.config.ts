import path from 'path';
import { en } from 'payload/i18n/en';
import { de } from 'payload/i18n/de';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { s3Storage } from '@payloadcms/storage-s3';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import { CV } from '@/payload/collections/CVs';
import { Users } from '@/payload/collections/Users';
import { Media } from '@/payload/collections/Media';
import { Organisations } from '@/payload/collections/Organisations';
import { seedDevUser } from '@/config/seed/dev-user';
import { cvPdfPlugin } from '@/payload/plugins/cv-pdf-generator/plugin';
import { Skills } from '@/payload/collections/Skills';
import { Levels } from '@/payload/collections/Level';
import { Companies } from '@/payload/collections/Companies';
import { Projects } from '@/payload/collections/Projects';
import { OAuth2Plugin } from 'payload-oauth2';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  //editor: slateEditor({}),
  editor: lexicalEditor(),
  collections: [CV, Users, Skills, Levels, Companies, Projects, Media, Organisations],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'src', 'types', 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URI || '',
    },
  }),
  localization: {
    locales: [
      // {
      //   label: 'English',
      //   code: 'en',
      // },
      {
        label: 'Deutsch',
        code: 'de',
      },
    ],
    defaultLocale: 'de',
    fallback: true,
  },
  i18n: {
    supportedLanguages: { en, de },
  },
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
    user: Users.slug,
    components: {
      afterLogin: ['src/payload/components/oauth-login-button#OAuthLoginButton'],
    },
  },
  email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_FROM_ADDRESS || '',
    defaultFromName: process.env.SMTP_FROM_ADDRESS || '',
    transportOptions: {
      host: process.env.SMTP_HOST || '',
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    },
  }),
  async onInit(payload) {
    await seedDevUser(payload);
  },
  plugins: [
    s3Storage({
      collections: {
        [Media.slug]: { prefix: Media.slug },
      },
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        bucketEndpoint: false,
        forcePathStyle: true,
        region: 'auto', // Cloudflare R2 specific
        endpoint: process.env.S3_ENDPOINT || '',
      },
      bucket: process.env.S3_BUCKET || '',
    }),
    cvPdfPlugin({
      templatePath: './data/cv-pdf/templates',
      collections: [CV.slug],
      gotenbergUrl: process.env.GOTENBERG_PDF_URL || 'http://localhost:3030',
    }),
    OAuth2Plugin({
      strategyName: 'oauth2',
      useEmailAsIdentity: false,
      enabled: true,
      serverURL: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
      authCollection: Users.slug,
      clientId: process.env.OAUTH_CLIENT_ID || '',
      clientSecret: process.env.OAUTH_CLIENT_SECRET || '',
      tokenEndpoint: 'https://scm.tegonal.com/oauth/token',
      scopes: ['email', 'profile', 'openid'],
      providerAuthorizationUrl: 'https://scm.tegonal.com/oauth/authorize',
      getUserInfo: async (accessToken) => {
        try {
          const response = await fetch('https://scm.tegonal.com/oauth/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const user = await response.json();
          return {
            email: user.email,
            sub: user.sub,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
      successRedirect: () => {
        console.log('Login successful, redirecting to /admin');
        return '/admin';
      },
      failureRedirect: (req, error) => {
        console.error(error);
        return '/oauth-error';
      },
    }),
  ],
  telemetry: false,
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable
  sharp,
});
