import { CollectionConfig } from 'payload';
import { adminSettingsField } from '@/payload/fields/admin-settings';
import { organisationsAccess } from '@/payload/collections/access/organisationsAccess';
import { loggedInAccess } from '@/payload/collections/access/loggedInAccess';
import { organisationAdminsAccess } from '@/payload/collections/access/organisationAdminsAccess';
import { I18nCollection } from '@/lib/i18nCollection';

export const Levels: CollectionConfig = {
  slug: 'level',
  admin: {
    group: I18nCollection.collectionGroup.settings,
    useAsTitle: 'level',
  },
  access: {
    read: organisationsAccess,
    create: loggedInAccess,
    update: organisationAdminsAccess,
    delete: organisationAdminsAccess,
  },
  fields: [
    {
      type: 'text',
      name: 'level',
    },
    {
      type: 'select',
      name: 'levelType',
      hasMany: true,
      options: [
        { label: 'Language', value: 'language' },
        { label: 'Skill', value: 'skill' },
      ],
    },
    {
      type: 'number',
      name: 'points',
    },
    adminSettingsField({ sidebar: true }),
  ],
};
