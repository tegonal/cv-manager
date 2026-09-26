import type { Config, Plugin } from 'payload'

import { CollectionConfig } from 'payload'

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
                  '/src/payload/plugins/cv-pdf-generator/ui/save-button-replacer.tsx#SaveButtonReplacer',
              },
            },
          },
        } satisfies CollectionConfig
      }),
      custom: {
        ...config.custom,
        cvPdfConfig: pluginConfig,
      },
    }
  }
