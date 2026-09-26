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
        // Adds the PDF button next to the save button, keeping the collection's own admin config
        return {
          ...collection,
          admin: {
            ...collection.admin,
            components: {
              ...collection.admin?.components,
              edit: {
                ...collection.admin?.components?.edit,
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
