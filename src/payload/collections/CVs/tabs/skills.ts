import { Field } from 'payload'

import { I18nCollection } from '@/lib/i18nCollection'
import {
  textDescription,
  textNameRequired,
} from '@/payload/collections/CVs/fields/common-text-fields'
import { selectLanguage } from '@/payload/collections/CVs/fields/select-language'
import { selectLanguageLevel } from '@/payload/collections/CVs/fields/select-language-level'
import { selectSkill } from '@/payload/collections/CVs/fields/select-skill'
import { selectSkillGroup } from '@/payload/collections/CVs/fields/select-skill-group'
import { selectTechSkillLevel } from '@/payload/collections/CVs/fields/select-tech-skill-level'

import { selectSubSkills } from '../fields/select-sub-skills'

export const SkillsTabFields: Field[] = [
  {
    admin: {
      components: {
        RowLabel: '/src/payload/collections/CVs/row-labels/row-label-language.tsx#RowLabelLanguage',
      },
      initCollapsed: true,
    },
    fields: [
      {
        fields: [selectLanguage, selectLanguageLevel],
        type: 'row',
      },
    ],
    label: I18nCollection.fieldLabel.languages,
    name: 'lang',
    type: 'array',
  },
  {
    admin: {
      components: {
        RowLabel: '/src/payload/collections/CVs/row-labels/row-label-skill.tsx#RowLabelSkill',
      },
      description: I18nCollection.fieldDescription.highlights,
      initCollapsed: true,
    },
    fields: [
      {
        fields: [selectSkill, selectTechSkillLevel],
        type: 'row',
      },
      textDescription,
    ],
    label: I18nCollection.fieldLabel.skillHighlights,
    name: 'skillHighlights',
    type: 'array',
  },
  {
    admin: {
      components: {
        RowLabel:
          '/src/payload/collections/CVs/row-labels/row-label-skill-group.tsx#RowLabelSkillGroup',
      },
      initCollapsed: true,
    },
    fields: [
      selectSkillGroup,
      {
        admin: {
          description:
            'Add a description to the skill group to describe your specific skills in that area.',
        },
        label: I18nCollection.fieldLabel.description,
        localized: true,
        name: 'skillGroupDescription',
        required: false,
        type: 'richText',
      },
      {
        admin: {
          components: {
            RowLabel: '/src/payload/collections/CVs/row-labels/row-label-skill.tsx#RowLabelSkill',
          },
          initCollapsed: true,
        },
        fields: [
          {
            fields: [selectSkill, selectTechSkillLevel, selectSubSkills],
            type: 'row',
          },
        ],
        label: I18nCollection.fieldLabel.skills,
        minRows: 1,
        name: 'skills',
        type: 'array',
      },
    ],
    label: I18nCollection.fieldLabel.skillCollections,
    minRows: 1,
    name: 'skillGroups',
    type: 'array',
  },
  {
    admin: {
      components: {
        RowLabel: '/src/payload/collections/CVs/row-labels/row-label-skill.tsx#RowLabelSkill',
      },
    },
    fields: [
      {
        fields: [textNameRequired, selectTechSkillLevel],
        type: 'row',
      },
    ],
    label: I18nCollection.fieldLabel.otherSkills,
    name: 'otherSkills',
    type: 'array',
  },
]
