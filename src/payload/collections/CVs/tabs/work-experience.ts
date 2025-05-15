import { I18nCollection } from '@/lib/i18nCollection'
import { textDescription } from '@/payload/collections/CVs/fields/common-text-fields'
import { Field } from 'payload'
import { selectCompany } from '@/payload/collections/CVs/fields/select-company'
import { optional } from '@/payload/collections/CVs/fields/optional'
import { selectEndYear, selectStartYear } from '@/payload/collections/CVs/fields/select-year'
import { selectProject } from '@/payload/collections/CVs/fields/select-project'

export const WorkExperienceTabFields: Field[] = [
  {
    name: 'jobHighlights',
    type: 'array',
    label: I18nCollection.fieldLabel.jobHighlights,
    admin: {
      components: {
        RowLabel: '/src/payload/collections/utils/row-label-first-text.tsx#RowLabelFirstText',
      },
      description: I18nCollection.fieldDescription.highlights,
    },
    fields: [
      {
        type: 'row',
        fields: [optional(selectStartYear), optional(selectEndYear)],
      },
      {
        type: 'row',
        fields: [selectCompany],
      },
      textDescription,
    ],
  },
  {
    name: 'projects',
    type: 'array',
    label: I18nCollection.fieldLabel.projects,
    admin: {
      components: {
        RowLabel: '/src/payload/collections/utils/row-label-first-text.tsx#RowLabelFirstText',
      },
    },
    fields: [
      {
        type: 'row',
        fields: [selectStartYear, optional(selectEndYear)],
      },
      {
        type: 'row',
        fields: [selectCompany, selectProject],
      },
      textDescription,
    ],
  },
]
