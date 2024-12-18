import { I18nCollection } from '@/lib/i18nCollection';
import { selectSkill } from '@/payload/collections/CVs/fields/select-skill';
import { selectTechSkillLevel } from '@/payload/collections/CVs/fields/select-tech-skill-level';
import {
  textDescription,
  textNameRequired,
} from '@/payload/collections/CVs/fields/common-text-fields';
import { selectSkillGroup } from '@/payload/collections/CVs/fields/select-skill-group';
import { selectLanguage } from '@/payload/collections/CVs/fields/select-language';
import { selectLanguageLevel } from '@/payload/collections/CVs/fields/select-language-level';
import { Field } from 'payload';
import { selectSubSkills } from '../fields/select-sub-skills';

export const SkillsTabFields: Field[] = [
  {
    name: 'lang',
    type: 'array',
    label: I18nCollection.fieldLabel.languages,
    admin: {
      initCollapsed: true,
      components: {
        RowLabel: '/src/payload/collections/CVs/row-labels/row-label-language.tsx#RowLabelLanguage',
      },
    },
    fields: [
      {
        type: 'row',
        fields: [selectLanguage, selectLanguageLevel],
      },
    ],
  },
  {
    name: 'skillHighlights',
    type: 'array',
    label: I18nCollection.fieldLabel.skillHighlights,
    admin: {
      initCollapsed: true,
      components: {
        RowLabel: '/src/payload/collections/CVs/row-labels/row-label-skill.tsx#RowLabelSkill',
      },
      description: I18nCollection.fieldDescription.highlights,
    },
    fields: [
      {
        type: 'row',
        fields: [selectSkill, selectTechSkillLevel],
      },
      textDescription,
    ],
  },
  {
    name: 'skillGroups',
    type: 'array',
    label: I18nCollection.fieldLabel.skillCollections,
    minRows: 1,
    admin: {
      initCollapsed: true,
      components: {
        RowLabel:
          '/src/payload/collections/CVs/row-labels/row-label-skill-group.tsx#RowLabelSkillGroup',
      },
    },
    fields: [
      selectSkillGroup,
      {
        name: 'skillGroupDescription',
        type: 'richText',
        label: I18nCollection.fieldLabel.description,
        required: false,
        localized: true,
        admin: {
          description:
            'Add a description to the skill group to describe your specific skills in that area.',
        },
      },
      {
        name: 'skills',
        type: 'array',
        label: I18nCollection.fieldLabel.skills,
        minRows: 1,
        admin: {
          initCollapsed: true,
          components: {
            RowLabel: '/src/payload/collections/CVs/row-labels/row-label-skill.tsx#RowLabelSkill',
          },
        },
        fields: [
          {
            type: 'row',
            fields: [selectSkill, selectTechSkillLevel, selectSubSkills],
          },
        ],
      },
    ],
  },
  {
    name: 'otherSkills',
    type: 'array',
    label: I18nCollection.fieldLabel.otherSkills,
    admin: {
      components: {
        RowLabel: '/src/payload/collections/CVs/row-labels/row-label-skill.tsx#RowLabelSkill',
      },
    },
    fields: [
      {
        type: 'row',
        fields: [textNameRequired, selectTechSkillLevel],
      },
    ],
  },
];
