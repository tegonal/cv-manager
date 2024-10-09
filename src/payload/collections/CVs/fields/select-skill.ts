import { Field } from 'payload';
import { I18nCollection } from '@/lib/i18nCollection';

export const selectSkill: Field = {
  name: 'skill',
  label: I18nCollection.fieldLabel.skills,
  type: 'relationship',
  relationTo: 'skill',
  required: true,
};
