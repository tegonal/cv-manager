import { Field } from 'payload';
import { I18nCollection } from '@/lib/i18nCollection';

export const selectSoftSkill: Field = {
  name: 'softSkill',
  label: I18nCollection.fieldLabel.skills,
  type: 'relationship',
  relationTo: 'skill',
  required: true,
  filterOptions: (data) => {
    return {
      skillType: { equals: 'soft' },
    };
  },
};
