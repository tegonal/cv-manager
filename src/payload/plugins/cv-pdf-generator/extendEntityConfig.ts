import { CvPdfConfig } from './types'
import { logger } from '@/lib/logger'
import { SaveButtonReplacer } from '@/payload/plugins/cv-pdf-generator/ui/saveButtonReplacer'
import { Field } from 'payload'

const hasCvPdfGenerator = (slug: string, config?: string[]) => {
  if (!config) return false
  return config.includes(slug)
}

export const extendEntityConfig = <Entity extends { slug: string; fields: Field[] }>(
  cvPdfConfig: CvPdfConfig,
  entityConfig?: Entity[],
  cvPdfEntityConfig?: string[],
) => {
  logger.info('extendEntityConfig', { cvPdfConfig, entityConfig, cvPdfEntityConfig })
  return entityConfig?.map((collection) => ({
    ...collection,
    fields: [
      ...(hasCvPdfGenerator(collection.slug, cvPdfEntityConfig)
        ? [
            {
              name: 'cvPdfGenerator',
              type: 'ui',
              admin: {
                components: {
                  Field: SaveButtonReplacer({ cvPdfConfig }),
                },
              },
            } as Field,
          ]
        : []),
      ...collection.fields,
    ],
  }))
}
