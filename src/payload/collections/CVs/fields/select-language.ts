import { Field } from 'payload'

import { I18nCollection } from '@/lib/i18nCollection'

export const selectLanguage: Field = {
  admin: {
    allowEdit: false,
    sortOptions: 'name',
    width: '50%',
  },
  label: I18nCollection.fieldLabel.skills,
  name: 'language',
  relationTo: 'langs',
  required: true,
  type: 'relationship',
}
