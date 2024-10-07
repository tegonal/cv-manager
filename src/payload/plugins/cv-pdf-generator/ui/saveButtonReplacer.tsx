import React from 'react';
import { DefaultSaveButton, DrawerToggler } from '@payloadcms/ui';
import { ExportOverlay } from '@/payload/plugins/cv-pdf-generator/ui/exportOverlay';

export const baseClass = 'cv-pdf-generator';
export const drawerSlug = 'cv-pdf-chooser';

export const SaveButtonReplacer: React.FC = () => {
  return (
    <>
      <div className={'flex flex-row gap-6'}>
        <DrawerToggler
          className={`${baseClass}__edit btn btn--size-small btn--style-secondary`}
          slug={drawerSlug}>
          Generate PDF
        </DrawerToggler>
        <DefaultSaveButton />
      </div>
      <ExportOverlay />
    </>
  );
};
