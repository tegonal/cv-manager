import { CollectionConfig } from 'payload';
import { adminSettingsField } from '@/payload/fields/admin-settings';
import { I18nCollection } from '@/lib/i18nCollection';
import { organisationsAccess } from '@/payload/collections/access/organisationsAccess';
import { loggedInAccess } from '@/payload/collections/access/loggedInAccess';
import { organisationAdminsAccess } from '@/payload/collections/access/organisationAdminsAccess';
import { ProfileTabFields } from '@/payload/collections/CVs/tabs/profile';
import { SkillsTabFields } from '@/payload/collections/CVs/tabs/skills';
import { EducationTabFields } from '@/payload/collections/CVs/tabs/education';
import { WorkExperienceTabFields } from '@/payload/collections/CVs/tabs/work-experience';

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
    read: organisationsAccess,
    create: loggedInAccess,
    update: organisationAdminsAccess,
    delete: organisationAdminsAccess,
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
};
