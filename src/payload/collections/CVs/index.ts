import { selectLanguageSkill } from '@/payload/collections/CVs/fields/select-language-skill';
import { selectLanguageLevel } from '@/payload/collections/CVs/fields/select-language-level';
import { selectSkillLevel } from '@/payload/collections/CVs/fields/select-skill-level';
import {
  selectEndYear,
  selectStartYear,
  selectYear,
} from '@/payload/collections/CVs/fields/select-year';
import {
  textDescription,
  textNameRequired,
} from '@/payload/collections/CVs/fields/common-text-fields';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { CollectionConfig } from 'payload';
import { adminSettingsField } from '@/payload/fields/admin-settings';
import { organisationsAccess } from '@/payload/collections/access/organisationsAccess';
import { loggedInAccess } from '@/payload/collections/access/loggedInAccess';
import { organisationAdminsAccess } from '@/payload/collections/access/organisationAdminsAccess';
import { I18nCollection } from '@/lib/i18nCollection';
import { selectTechnicalSkill } from '@/payload/collections/CVs/fields/select-technical-skill';
import { selectSoftSkill } from '@/payload/collections/CVs/fields/select-soft-skill';
import { selectCompany } from '@/payload/collections/CVs/fields/select-company';
import { selectProject } from '@/payload/collections/CVs/fields/select-project';

export const CV: CollectionConfig = {
  slug: 'cv',
  admin: {
    useAsTitle: 'fullName',
    description: 'Curriculum Vitae',
  },
  labels: {
    singular: 'CV',
    plural: 'CVs',
  },
  access: {
    read: organisationsAccess,
    create: loggedInAccess,
    update: organisationAdminsAccess,
    delete: organisationAdminsAccess,
  },
  fields: [
    {
      type: 'collapsible',
      label: I18nCollection.fieldLabel.personalInformation,
      fields: [
        {
          name: 'fullName',
          label: I18nCollection.fieldLabel.fullName,
          type: 'text',
          required: true,
        },
        {
          name: 'birthday',
          type: 'date',
          label: I18nCollection.fieldLabel.birthday,
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'dd.MM.yyyy',
            },
          },
        },
        {
          type: 'text',
          name: 'nationalityStatus',
          label: I18nCollection.fieldLabel.nationalityStatus,
        },
        {
          name: 'image',
          type: 'relationship',
          label: I18nCollection.fieldLabel.profileImage,
          relationTo: 'media',
          hasMany: false,
        },

        {
          name: 'phoneNumber',
          type: 'text',
          label: I18nCollection.fieldLabel.phoneNumber,
        },
        {
          name: 'email',
          type: 'text',
          label: I18nCollection.fieldLabel.email,
          required: true,
        },
        {
          name: 'jobTitle',
          type: 'text',
          label: I18nCollection.fieldLabel.currentJobTitle,
          localized: true,
          required: true,
        },
        {
          name: 'department',
          type: 'text',
          label: I18nCollection.fieldLabel.currentJobDepartment,
          localized: true,
        },
        {
          name: 'links', // required
          type: 'array', // required
          label: I18nCollection.fieldLabel.links,
          minRows: 0,
          maxRows: 10,
          interfaceName: 'SocialLinks',
          fields: [
            {
              name: 'platform',
              type: 'select',
              options: [
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'X', value: 'x' },
                { label: 'Mastodon', value: 'mastodon' },
                { label: 'Facebook', value: 'facebook' },
                { label: 'GitHub', value: 'github' },
              ],
              required: true,
              label: I18nCollection.fieldLabel.socialMediaSite,
            },
            {
              name: 'url',
              type: 'text',
              label: I18nCollection.fieldLabel.url,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'introduction',
      label: I18nCollection.fieldLabel.introduction,
      type: 'richText',
      required: true,
      localized: true,
      editor: lexicalEditor(),
      admin: {
        description:
          'Write an introduction about yourself. Try to cover some personal topics and your professional background. Please do not use formatting.',
      },
    },
    {
      type: 'collapsible',
      label: I18nCollection.fieldLabel.skills,
      required: true,
      fields: [
        {
          name: 'languages',
          type: 'array',
          label: I18nCollection.fieldLabel.languages,
          minRows: 1,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '/src/payload/collections/utils/row-label-first-text.tsx#RowLabelFirstText',
            },
          },
          fields: [
            {
              type: 'row',
              fields: [selectLanguageSkill, selectLanguageLevel],
            },
          ],
        },
        {
          name: 'technologies',
          type: 'array',
          label: I18nCollection.fieldLabel.technologies,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '/src/payload/collections/utils/row-label-first-text.tsx#RowLabelFirstText',
            },
          },
          fields: [
            {
              type: 'row',
              fields: [selectTechnicalSkill, selectSkillLevel],
            },
          ],
        },
        {
          name: 'softSkills',
          type: 'array',
          label: I18nCollection.fieldLabel.softSkills,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '/src/payload/collections/utils/row-label-first-text.tsx#RowLabelFirstText',
            },
          },
          fields: [
            {
              type: 'row',
              fields: [selectSoftSkill, selectSkillLevel],
            },
          ],
        },
        {
          name: 'otherSkills',
          type: 'array',
          label: I18nCollection.fieldLabel.otherSkills,
          admin: {
            components: {
              RowLabel: '/src/payload/collections/utils/row-label-first-text.tsx#RowLabelFirstText',
            },
          },
          fields: [
            {
              type: 'row',
              fields: [textNameRequired, selectSkillLevel],
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: I18nCollection.fieldLabel.education,
      fields: [
        {
          name: 'edu',
          type: 'array',
          label: I18nCollection.fieldLabel.schools,
          minRows: 1,
          admin: {
            components: {
              RowLabel: '/src/payload/collections/utils/row-label-first-text.tsx#RowLabelFirstText',
            },
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'institution',
                  type: 'text',
                  label: I18nCollection.fieldLabel.name,
                  localized: true,
                  required: true,
                },
                selectStartYear,
                selectEndYear,
              ],
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
              fields: [textNameRequired, selectYear],
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
              fields: [textNameRequired, selectYear],
            },
            textDescription,
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: I18nCollection.fieldLabel.workExperience,
      fields: [
        {
          name: 'projects',
          type: 'array',
          label: I18nCollection.fieldLabel.projects,
          minRows: 1,
          admin: {
            components: {
              RowLabel: '/src/payload/collections/utils/row-label-first-text.tsx#RowLabelFirstText',
            },
          },
          fields: [
            {
              type: 'row',
              fields: [selectCompany, selectProject],
            },
            {
              type: 'row',
              fields: [selectStartYear, selectEndYear],
            },
            textDescription,
          ],
        },
      ],
    },
    adminSettingsField({ sidebar: true }),
  ],
};
