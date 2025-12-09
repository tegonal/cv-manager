import { Field } from 'payload'

import { I18nCollection } from '@/lib/i18nCollection'

export const selectStartYear: Field = {
  admin: {
    date: {
      displayFormat: 'yyyy',
      pickerAppearance: 'monthOnly',
    },
    width: '20%',
  },
  label: I18nCollection.fieldLabel.fromYear,
  name: 'fromYear',
  required: true,
  type: 'date',
}

export const selectEndYear: Field = {
  admin: {
    date: {
      displayFormat: 'yyyy',
      pickerAppearance: 'monthOnly',
    },
    width: '20%',
  },
  label: I18nCollection.fieldLabel.toYear,
  name: 'toYear',
  required: true,
  type: 'date',
}

export const selectYear: Field = {
  admin: {
    date: {
      displayFormat: 'yyyy',
      pickerAppearance: 'monthOnly',
    },
    width: '20%',
  },
  label: I18nCollection.fieldLabel.year,
  name: 'toYear',
  required: true,
  type: 'date',
}
