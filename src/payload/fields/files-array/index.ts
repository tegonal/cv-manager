import { I18nCollection } from '@/lib/i18nCollection';
import { Field } from 'payload';

export const filesArrayField: Field = {
  name: 'files',
  type: 'array',
  label: false,
  admin: {
    description: I18nCollection.fieldDescription.filesArray,
  },
  fields: [
    {
      name: 'document',
      type: 'relationship',
      label: I18nCollection.fieldLabel.file,
      relationTo: 'documents',
      localized: true,
      admin: {
        description: I18nCollection.fieldDescription.file,
      },
    },
  ],
};
