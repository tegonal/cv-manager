import { Field } from 'payload';
import { I18nCollection } from '@/lib/i18nCollection';

export const selectSkill: Field = {
  name: 'skill',
  label: I18nCollection.fieldLabel.mainSkill,
  type: 'relationship',
  relationTo: ['skill', 'skillGroup'],
  required: true,
  admin: {
    sortOptions: {
      skill: 'name',
      skillGroup: 'name',
    },
    allowEdit: false,
    width: '50%',
  },
};
