import { Field } from 'payload'

import { I18nCollection } from '@/lib/i18n-collection'

export const selectCompany: Field = {
  admin: {
    allowEdit: true,
    sortOptions: 'name',
  },
  label: I18nCollection.fieldLabel.companies,
  name: 'company',
  relationTo: 'company',
  required: true,
  type: 'relationship',
}
