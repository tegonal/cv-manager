import { Field } from 'payload';
import { I18nCollection } from '@/lib/i18nCollection';

export const selectStartYear: Field = {
  name: 'fromYear',
  type: 'date',
  label: I18nCollection.fieldLabel.fromYear,
  required: true,
  admin: {
    date: {
      pickerAppearance: 'monthOnly',
      displayFormat: 'yyyy',
    },
  },
};

export const selectEndYear: Field = {
  name: 'toYear',
  type: 'date',
  label: I18nCollection.fieldLabel.toYear,
  required: true,
  admin: {
    date: {
      pickerAppearance: 'monthOnly',
      displayFormat: 'yyyy',
    },
  },
};

export const selectYear: Field = {
  name: 'toYear',
  type: 'date',
  label: I18nCollection.fieldLabel.year,
  required: true,
  admin: {
    date: {
      pickerAppearance: 'monthOnly',
      displayFormat: 'yyyy',
    },
  },
};
