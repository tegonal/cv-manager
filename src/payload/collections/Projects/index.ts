import { CollectionConfig } from 'payload';
import { adminSettingsField } from '@/payload/fields/admin-settings';
import { isLoggedInAccess } from '@/payload/access/is-logged-in-access';
import { I18nCollection } from '@/lib/i18nCollection';
import { defaultCollectionAccess } from '@/payload/access/default-collection-access';

export const Projects: CollectionConfig = {
  slug: 'project',
  access: {
    read: defaultCollectionAccess,
    create: isLoggedInAccess,
    update: defaultCollectionAccess,
    delete: defaultCollectionAccess,
  },
  admin: {
    group: I18nCollection.collectionGroup.settings,
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      localized: true,
    },
    {
      type: 'richText',
      name: 'description',
      localized: true,
    },
    adminSettingsField({ sidebar: true }),
  ],
};
