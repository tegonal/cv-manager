import { Field } from 'payload';
import { I18nCollection } from '@/lib/i18nCollection';

export const selectSubSkills: Field = {
  name: 'sub-skill',
  label: I18nCollection.fieldLabel.subSkills,
  type: 'relationship',
  relationTo: 'skill',
  required: false,
  hasMany: true,
  admin: {
    sortOptions: 'name',
    allowEdit: true,
  },
};
