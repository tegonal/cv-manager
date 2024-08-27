import { Field } from 'payload';
import { I18nCollection } from '@/lib/i18nCollection';

export const selectSkillLevel: Field = {
  name: 'level',
  type: 'relationship',
  label: I18nCollection.fieldLabel.skillLevel,
  relationTo: 'level',
  required: true,
  filterOptions: () => {
    return {
      levelType: { equals: 'skill' },
    };
  },
};
