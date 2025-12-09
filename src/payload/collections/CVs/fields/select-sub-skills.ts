import { Field } from 'payload'

import { I18nCollection } from '@/lib/i18nCollection'

export const selectSubSkills: Field = {
  admin: {
    allowEdit: true,
    sortOptions: 'name',
  },
  hasMany: true,
  label: I18nCollection.fieldLabel.subSkills,
  name: 'sub-skill',
  relationTo: 'skill',
  required: false,
  type: 'relationship',
}
