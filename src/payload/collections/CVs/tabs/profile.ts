import { Field } from 'payload'

import { I18nCollection } from '@/lib/i18nCollection'

export const ProfileTabFields: Field[] = [
  {
    admin: {
      description: I18nCollection.fieldDescription.fullName,
    },
    label: I18nCollection.fieldLabel.fullName,
    name: 'fullName',
    required: true,
    type: 'text',
  },
  {
    hasMany: false,
    label: I18nCollection.fieldLabel.profileImage,
    name: 'image',
    relationTo: 'media',
    type: 'relationship',
  },
  {
    admin: {
      description:
        'Write an introduction about yourself. Try to cover some personal topics and your professional background. Please do not use formatting.',
    },
    label: I18nCollection.fieldLabel.introduction,
    localized: true,
    name: 'introduction',
    required: false,
    type: 'richText',
  },
  {
    label: I18nCollection.fieldLabel.casualInfo,
    localized: true,
    name: 'casualInfo',
    type: 'richText',
  },

  {
    admin: {
      date: {
        displayFormat: 'dd.MM.yyyy',
        pickerAppearance: 'dayOnly',
      },
    },
    label: I18nCollection.fieldLabel.birthday,
    name: 'birthday',
    required: true,
    type: 'date',
  },
  {
    label: I18nCollection.fieldLabel.nationalityStatus,
    name: 'nationalityStatus',
    type: 'text',
  },
  {
    label: I18nCollection.fieldLabel.phoneNumber,
    name: 'phoneNumber',
    type: 'text',
  },
  {
    label: I18nCollection.fieldLabel.email,
    name: 'email',
    required: true,
    type: 'text',
  },
  {
    label: I18nCollection.fieldLabel.currentJobTitle,
    localized: true,
    name: 'jobTitle',
    required: true,
    type: 'text',
  },
  {
    label: I18nCollection.fieldLabel.currentJobDepartment,
    localized: true,
    name: 'department',
    type: 'text',
  },
  {
    fields: [
      {
        label: I18nCollection.fieldLabel.socialMediaSite,
        name: 'platform',
        options: [
          { label: 'LinkedIn', value: 'linkedin' },
          { label: 'X', value: 'x' },
          { label: 'Mastodon', value: 'mastodon' },
          { label: 'Facebook', value: 'facebook' },
          { label: 'GitHub', value: 'github' },
        ],
        required: true,
        type: 'select',
      },
      {
        label: I18nCollection.fieldLabel.url,
        name: 'url',
        required: true,
        type: 'text',
      },
    ],
    interfaceName: 'SocialLinks',
    label: I18nCollection.fieldLabel.externalProfiles,
    maxRows: 10,
    minRows: 0,
    name: 'links', // required
    type: 'array', // required
  },
]
