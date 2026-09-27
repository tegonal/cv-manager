import { DrawerToggler, SaveButton } from '@payloadcms/ui'
import React from 'react'

import { baseClass, drawerSlug } from '@/payload/plugins/cv-pdf-generator/ui/constants'
import { ExportOverlay } from '@/payload/plugins/cv-pdf-generator/ui/export-overlay'

export const SaveButtonReplacer: React.FC = () => {
  return (
    <>
      <div className={'flex flex-row gap-6'}>
        <DrawerToggler
          className={`${baseClass}__edit btn btn--size-small btn--style-secondary`}
          slug={drawerSlug}>
          Generate PDF
        </DrawerToggler>
        <SaveButton />
      </div>
      <ExportOverlay />
    </>
  )
}
