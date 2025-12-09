import { Field } from 'payload'

import { I18nCollection } from '@/lib/i18nCollection'

export const selectProject: Field = {
  admin: {
    allowEdit: true,
    sortOptions: 'name',
    width: '50%',
  },
  label: I18nCollection.fieldLabel.projects,
  name: 'project',
  relationTo: 'project',
  required: true,
  type: 'relationship',
}
