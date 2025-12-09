import { CollectionConfig } from 'payload'

import { I18nCollection } from '@/lib/i18nCollection'
import { defaultCollectionAccess } from '@/payload/access/default-collection-access'
import { isLoggedInAccess } from '@/payload/access/is-logged-in-access'
import { EducationTabFields } from '@/payload/collections/CVs/tabs/education'
import { ProfileTabFields } from '@/payload/collections/CVs/tabs/profile'
import { SkillsTabFields } from '@/payload/collections/CVs/tabs/skills'
import { WorkExperienceTabFields } from '@/payload/collections/CVs/tabs/work-experience'
import { adminSettingsField } from '@/payload/fields/admin-settings'

export const CV: CollectionConfig = {
  access: {
    create: isLoggedInAccess,
    delete: defaultCollectionAccess,
    read: defaultCollectionAccess,
    update: defaultCollectionAccess,
  },
  admin: {
    defaultColumns: ['id', 'fullName', 'jobTitle', 'birthday', 'skillGroup', 'updatedAt'],
    description: 'Curriculum Vitae',
    useAsTitle: 'fullName',
  },
  fields: [
    {
      tabs: [
        {
          fields: ProfileTabFields,
          label: I18nCollection.fieldLabel.profile,
        },
        {
          fields: SkillsTabFields,
          label: I18nCollection.fieldLabel.skills,
        },
        {
          fields: EducationTabFields,
          label: I18nCollection.fieldLabel.education,
        },
        {
          fields: WorkExperienceTabFields,
          label: I18nCollection.fieldLabel.workExperience,
        },
      ],
      type: 'tabs',
    },
    adminSettingsField({ sidebar: true }),
  ],
  labels: {
    plural: 'CVs',
    singular: 'CV',
  },
  slug: 'cv',
}
