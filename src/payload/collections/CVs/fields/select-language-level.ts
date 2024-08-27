import { Field } from 'payload';
import { I18nCollection } from '@/lib/i18nCollection';

export const selectLanguageLevel: Field = {
  name: 'level',
  type: 'relationship',
  label: I18nCollection.fieldLabel.languageLevel,
  relationTo: 'level',
  required: true,
  filterOptions: () => {
    return {
      levelType: { equals: 'language' },
    };
  },
};
