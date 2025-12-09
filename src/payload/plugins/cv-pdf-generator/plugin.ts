import type { Config, Plugin } from 'payload'

import { CollectionConfig } from 'payload'

import { logger } from '@/lib/logger'
import { pluginConstants } from '@/payload/plugins/cv-pdf-generator/const'
import { requestHandler } from '@/payload/plugins/cv-pdf-generator/handler'

import type { CvPdfConfig } from './types'

export const cvPdfPlugin =
  (pluginConfig: CvPdfConfig): Plugin =>
  (config: Config) => {
    return {
      ...config,
      collections: config.collections?.map((collection) => {
        if (!pluginConfig?.collections?.includes(collection.slug)) return collection
        return {
          ...collection,
          admin: {
            components: {
              edit: {
                SaveButton:
                  '/src/payload/plugins/cv-pdf-generator/ui/saveButtonReplacer.tsx#SaveButtonReplacer',
              },
            },
          },
        } satisfies CollectionConfig
      }),
      custom: {
        ...config.custom,
        cvPdfConfig: pluginConfig,
      },
      endpoints: [
        ...(config.endpoints || []),
        {
          handler: async (req) => {
            if (!req.json) {
              return new Response(JSON.stringify({ error: 'No data provided' }), { status: 400 })
            }
            const body = await req.json()
            logger.info('cvPdfPlugin endpoint', body)

            const { exportOverride, id, locale } = body
            if (!id) {
              return new Response(JSON.stringify({ error: 'No id provided' }), { status: 400 })
            }
            if (!locale) {
              return new Response(JSON.stringify({ error: 'No locale provided' }), { status: 400 })
            }
            const result = await requestHandler(req, { exportOverride, id, locale })
            if ('error' in result) {
              return new Response(JSON.stringify(result), { status: 400 })
            } else {
              // @ts-ignore
              return new Response(result, { status: 200 })
            }
          },
          method: 'post',
          path: `/${pluginConstants.apiUrlSlug}`,
        },
      ],
    }
  }
