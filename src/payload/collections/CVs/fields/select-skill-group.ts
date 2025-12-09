import { Field } from 'payload'

import { I18nCollection } from '@/lib/i18nCollection'

export const selectSkillGroup: Field = {
  admin: {
    allowEdit: false,
    sortOptions: 'name',
  },
  label: I18nCollection.fieldLabel.skillGroup,
  name: 'group',
  relationTo: 'skillGroup',
  required: true,
  type: 'relationship',
}
