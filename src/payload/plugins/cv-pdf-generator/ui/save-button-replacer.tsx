import type { SaveButtonServerProps } from 'payload'

import { getTranslation } from '@payloadcms/translations'
import { DrawerToggler, SaveButton } from '@payloadcms/ui'
import React from 'react'

import { I18nCollection } from '@/lib/i18n-collection'
import { baseClass, drawerSlug } from '@/payload/plugins/cv-pdf-generator/ui/constants'
import { ExportOverlay } from '@/payload/plugins/cv-pdf-generator/ui/export-overlay'

export const SaveButtonReplacer: React.FC<SaveButtonServerProps> = ({ i18n }) => {
  return (
    <>
      <div className={'flex flex-row gap-6'}>
        <DrawerToggler
          className={`${baseClass}__edit btn btn--size-small btn--style-secondary`}
          slug={drawerSlug}>
          {getTranslation(I18nCollection.pdfExport.generatePdf, i18n)}
        </DrawerToggler>
        <SaveButton />
      </div>
      <ExportOverlay />
    </>
  )
}
