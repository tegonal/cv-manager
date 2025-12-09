import { Field } from 'payload'

import { I18nCollection } from '@/lib/i18n-collection'

export const selectTechSkillLevel: Field = {
  admin: {
    allowEdit: false,
    sortOptions: 'points',
    width: '50%',
  },
  filterOptions: () => {
    return {
      levelType: { equals: 'skill' },
    }
  },
  label: I18nCollection.fieldLabel.skillLevel,
  name: 'level',
  relationTo: 'level',
  required: false,
  type: 'relationship',
}
