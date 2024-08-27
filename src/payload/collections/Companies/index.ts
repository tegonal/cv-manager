import { CollectionConfig } from 'payload';
import { adminSettingsField } from '@/payload/fields/admin-settings';
import { organisationsAccess } from '@/payload/collections/access/organisationsAccess';
import { loggedInAccess } from '@/payload/collections/access/loggedInAccess';
import { organisationAdminsAccess } from '@/payload/collections/access/organisationAdminsAccess';
import { I18nCollection } from '@/lib/i18nCollection';

export const Companies: CollectionConfig = {
  slug: 'company',
  access: {
    read: organisationsAccess,
    create: loggedInAccess,
    update: organisationAdminsAccess,
    delete: organisationAdminsAccess,
  },
  admin: {
    group: I18nCollection.collectionGroup.settings,
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'text',
      name: 'name',
    },
    adminSettingsField({ sidebar: true }),
  ],
};
