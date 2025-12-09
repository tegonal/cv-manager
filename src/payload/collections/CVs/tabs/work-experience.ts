import { Field } from 'payload'

import { I18nCollection } from '@/lib/i18n-collection'
import { textDescription } from '@/payload/collections/CVs/fields/common-text-fields'
import { optional } from '@/payload/collections/CVs/fields/optional'
import { selectCompany } from '@/payload/collections/CVs/fields/select-company'
import { selectProject } from '@/payload/collections/CVs/fields/select-project'
import { selectEndYear, selectStartYear } from '@/payload/collections/CVs/fields/select-year'

export const WorkExperienceTabFields: Field[] = [
  {
    admin: {
      components: {
        RowLabel: '/src/payload/collections/utils/row-label-first-text.tsx#RowLabelFirstText',
      },
      description: I18nCollection.fieldDescription.highlights,
    },
    fields: [
      {
        fields: [optional(selectStartYear), optional(selectEndYear)],
        type: 'row',
      },
      {
        fields: [selectCompany],
        type: 'row',
      },
      textDescription,
    ],
    label: I18nCollection.fieldLabel.jobHighlights,
    name: 'jobHighlights',
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
        fields: [selectStartYear, optional(selectEndYear)],
        type: 'row',
      },
      {
        fields: [selectCompany, selectProject],
        type: 'row',
      },
      textDescription,
    ],
    label: I18nCollection.fieldLabel.projects,
    name: 'projects',
    type: 'array',
  },
]
