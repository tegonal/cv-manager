import { I18nCollection } from '@/lib/i18nCollection';
import { Field } from 'payload';

export const ProfileTabFields: Field[] = [
  {
    name: 'fullName',
    label: I18nCollection.fieldLabel.fullName,
    admin: {
      description: I18nCollection.fieldDescription.fullName,
    },
    type: 'text',
    required: true,
  },
  {
    name: 'image',
    type: 'relationship',
    label: I18nCollection.fieldLabel.profileImage,
    relationTo: 'media',
    hasMany: false,
  },
  {
    name: 'introduction',
    label: I18nCollection.fieldLabel.introduction,
    type: 'richText',
    required: false,
    localized: true,
    admin: {
      description:
        'Write an introduction about yourself. Try to cover some personal topics and your professional background. Please do not use formatting.',
    },
  },
  {
    name: 'casualInfo',
    label: I18nCollection.fieldLabel.casualInfo,
    type: 'richText',
    localized: true,
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
    label: I18nCollection.fieldLabel.externalProfiles,
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
];
