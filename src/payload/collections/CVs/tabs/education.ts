import { Field } from 'payload'

import { I18nCollection } from '@/lib/i18n-collection'
import {
  textDescription,
  textLinkOptional,
  textNameRequired,
} from '@/payload/collections/CVs/fields/common-text-fields'
import { optional } from '@/payload/collections/CVs/fields/optional'
import {
  selectEndYear,
  selectStartYear,
  selectYear,
} from '@/payload/collections/CVs/fields/select-year'

export const EducationTabFields: Field[] = [
  {
    admin: {
      components: {
        RowLabel: '/src/payload/collections/utils/row-label-first-text.tsx#RowLabelFirstText',
      },
      description: I18nCollection.fieldDescription.highlights,
    },
    fields: [
      {
        label: I18nCollection.fieldLabel.title,
        name: 'title',
        type: 'text',
      },
      {
        fields: [optional(selectStartYear), optional(selectEndYear), textLinkOptional],
        type: 'row',
      },
      textDescription,
    ],
    label: I18nCollection.fieldLabel.educationHighlights,
    name: 'eduHighlights',
    type: 'array',
  },
  {
    admin: {
      components: {
        RowLabel: '/src/payload/collections/utils/row-label-first-text.tsx#RowLabelFirstText',
      },
    },
    fields: [
      {
        label: I18nCollection.fieldLabel.name,
        localized: true,
        name: 'institution',
        required: true,
        type: 'text',
      },
      {
        fields: [selectStartYear, selectEndYear, textLinkOptional],
        type: 'row',
      },
      textDescription,
    ],
    label: I18nCollection.fieldLabel.schools,
    name: 'edu',
    type: 'array',
  },
  {
    admin: {
      components: {
        RowLabel: '/src/payload/collections/utils/row-label-first-text.tsx#RowLabelFirstText',
      },
    },
    fields: [
      {
        fields: [selectYear, textNameRequired, textLinkOptional],
        type: 'row',
      },
      textDescription,
    ],
    label: I18nCollection.fieldLabel.certifications,
    name: 'certs',
    type: 'array',
  },
  {
    admin: {
      components: {
        RowLabel: '/src/payload/collections/utils/row-label-first-text.tsx#RowLabelFirstText',
      },
    },
    fields: [
      {
        fields: [selectYear, textNameRequired, textLinkOptional],
        type: 'row',
      },
      textDescription,
    ],
    label: I18nCollection.fieldLabel.courses,
    name: 'courses',
    type: 'array',
  },
]
