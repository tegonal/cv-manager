import { Field } from 'payload'

import { I18nCollection } from '@/lib/i18n-collection'

export const selectLanguageLevel: Field = {
  admin: {
    width: '50%',
  },
  filterOptions: () => {
    return {
      levelType: { equals: 'language' },
    }
  },
  label: I18nCollection.fieldLabel.languageLevel,
  name: 'level',
  relationTo: 'level',
  required: true,
  type: 'relationship',
}
