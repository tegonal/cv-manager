import { Field } from 'payload';
import { I18nCollection } from '@/lib/i18nCollection';

export const selectSkillGroup: Field = {
  name: 'group',
  type: 'relationship',
  label: I18nCollection.fieldLabel.skillGroup,
  relationTo: 'skillGroup',
  required: true,
};
