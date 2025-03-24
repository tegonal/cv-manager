import { CollectionConfig } from 'payload'
import { adminSettingsField } from '@/payload/fields/admin-settings'
import { I18nCollection } from '@/lib/i18nCollection'
import { isLoggedInAccess } from '@/payload/access/is-logged-in-access'
import { ProfileTabFields } from '@/payload/collections/CVs/tabs/profile'
import { SkillsTabFields } from '@/payload/collections/CVs/tabs/skills'
import { EducationTabFields } from '@/payload/collections/CVs/tabs/education'
import { WorkExperienceTabFields } from '@/payload/collections/CVs/tabs/work-experience'
import { defaultCollectionAccess } from '@/payload/access/default-collection-access'

export const CV: CollectionConfig = {
  slug: 'cv',
  admin: {
    useAsTitle: 'fullName',
    description: 'Curriculum Vitae',
    defaultColumns: ['id', 'fullName', 'jobTitle', 'birthday', 'skillGroup', 'updatedAt'],
  },
  labels: {
    singular: 'CV',
    plural: 'CVs',
  },
  access: {
    read: defaultCollectionAccess,
    create: isLoggedInAccess,
    update: defaultCollectionAccess,
    delete: defaultCollectionAccess,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: I18nCollection.fieldLabel.profile,
          fields: ProfileTabFields,
        },
        {
          label: I18nCollection.fieldLabel.skills,
          fields: SkillsTabFields,
        },
        {
          label: I18nCollection.fieldLabel.education,
          fields: EducationTabFields,
        },
        {
          label: I18nCollection.fieldLabel.workExperience,
          fields: WorkExperienceTabFields,
        },
      ],
    },
    adminSettingsField({ sidebar: true }),
  ],
}
