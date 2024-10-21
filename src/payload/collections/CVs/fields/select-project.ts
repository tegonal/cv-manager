import { Field } from 'payload';
import { I18nCollection } from '@/lib/i18nCollection';

export const selectProject: Field = {
  name: 'project',
  label: I18nCollection.fieldLabel.projects,
  type: 'relationship',
  relationTo: 'project',
  required: true,
  admin: {
    sortOptions: 'name',
    allowEdit: true,
    width: '50%',
  },
};
