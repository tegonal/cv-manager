import { Field } from 'payload'

import { SaveButtonReplacer } from '@/payload/plugins/cv-pdf-generator/ui/save-button-replacer'

import { CvPdfConfig } from './types'

const hasCvPdfGenerator = (slug: string, config?: string[]) => {
  if (!config) return false
  return config.includes(slug)
}

export const extendEntityConfig = <Entity extends { fields: Field[]; slug: string }>(
  cvPdfConfig: CvPdfConfig,
  entityConfig?: Entity[],
  cvPdfEntityConfig?: string[],
) => {
  return entityConfig?.map((collection) => ({
    ...collection,
    fields: [
      ...(hasCvPdfGenerator(collection.slug, cvPdfEntityConfig)
        ? [
            {
              admin: {
                components: {
                  Field: SaveButtonReplacer({ cvPdfConfig }),
                },
              },
              name: 'cvPdfGenerator',
              type: 'ui',
            } as Field,
          ]
        : []),
      ...collection.fields,
    ],
  }))
}
