import { Field } from 'payload';
import { I18nCollection } from '@/lib/i18nCollection';

export const selectSkillGroup: Field = {
  name: 'group',
  label: I18nCollection.fieldLabel.skillGroup,
  type: 'relationship',
  relationTo: 'skillGroup',
  required: true,
  admin: {
    sortOptions: 'name',
    allowEdit: false,
  },
};
