import { Field } from 'payload'
import { I18nCollection } from '@/lib/i18nCollection'

export const selectCompany: Field = {
  name: 'company',
  label: I18nCollection.fieldLabel.companies,
  type: 'relationship',
  relationTo: 'company',
  required: true,
  admin: {
    sortOptions: 'name',
    allowEdit: true,
  },
}
