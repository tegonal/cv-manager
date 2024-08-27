import { Field } from 'payload';
import { I18nCollection } from '@/lib/i18nCollection';

export const selectTechnicalSkill: Field = {
  name: 'skill',
  label: I18nCollection.fieldLabel.language,
  type: 'relationship',
  relationTo: 'skill',
  required: true,
  filterOptions: () => {
    return {
      skillType: { equals: 'technical' },
    };
  },
};
