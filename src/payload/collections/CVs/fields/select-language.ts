import { Field } from 'payload';
import { I18nCollection } from '@/lib/i18nCollection';

export const selectLanguage: Field = {
  name: 'language',
  label: I18nCollection.fieldLabel.skills,
  type: 'relationship',
  relationTo: 'langs',
  required: true,
  admin: {
    sortOptions: 'name',
    allowEdit: false,
  },
};
