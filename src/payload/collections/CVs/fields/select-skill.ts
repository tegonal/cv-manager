import { Field } from 'payload'

import { I18nCollection } from '@/lib/i18n-collection'

export const selectSkill: Field = {
  admin: {
    allowEdit: false,
    sortOptions: {
      skill: 'name',
      skillGroup: 'name',
    },
    width: '50%',
  },
  label: I18nCollection.fieldLabel.mainSkill,
  name: 'skill',
  relationTo: ['skill', 'skillGroup'],
  required: true,
  type: 'relationship',
}
