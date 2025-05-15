import { I18nCollection } from '@/lib/i18nCollection'
import {
  textDescription,
  textLinkOptional,
  textNameRequired,
} from '@/payload/collections/CVs/fields/common-text-fields'
import { Field } from 'payload'
import { optional } from '@/payload/collections/CVs/fields/optional'
import {
  selectEndYear,
  selectStartYear,
  selectYear,
} from '@/payload/collections/CVs/fields/select-year'

export const EducationTabFields: Field[] = [
  {
    name: 'eduHighlights',
    type: 'array',
    label: I18nCollection.fieldLabel.educationHighlights,
    admin: {
      components: {
        RowLabel: '/src/payload/collections/utils/row-label-first-text.tsx#RowLabelFirstText',
      },
      description: I18nCollection.fieldDescription.highlights,
    },
    fields: [
      {
        type: 'text',
        name: 'title',
        label: I18nCollection.fieldLabel.title,
      },
      {
        type: 'row',
        fields: [optional(selectStartYear), optional(selectEndYear), textLinkOptional],
      },
      textDescription,
    ],
  },
  {
    name: 'edu',
    type: 'array',
    label: I18nCollection.fieldLabel.schools,
    admin: {
      components: {
        RowLabel: '/src/payload/collections/utils/row-label-first-text.tsx#RowLabelFirstText',
      },
    },
    fields: [
      {
        name: 'institution',
        type: 'text',
        label: I18nCollection.fieldLabel.name,
        localized: true,
        required: true,
      },
      {
        type: 'row',
        fields: [selectStartYear, selectEndYear, textLinkOptional],
      },
      textDescription,
    ],
  },
  {
    name: 'certs',
    type: 'array',
    label: I18nCollection.fieldLabel.certifications,
    admin: {
      components: {
        RowLabel: '/src/payload/collections/utils/row-label-first-text.tsx#RowLabelFirstText',
      },
    },
    fields: [
      {
        type: 'row',
        fields: [selectYear, textNameRequired, textLinkOptional],
      },
      textDescription,
    ],
  },
  {
    name: 'courses',
    type: 'array',
    label: I18nCollection.fieldLabel.courses,
    admin: {
      components: {
        RowLabel: '/src/payload/collections/utils/row-label-first-text.tsx#RowLabelFirstText',
      },
    },
    fields: [
      {
        type: 'row',
        fields: [selectYear, textNameRequired, textLinkOptional],
      },
      textDescription,
    ],
  },
]
