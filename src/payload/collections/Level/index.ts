import { CollectionConfig } from 'payload';
import { adminSettingsField } from '@/payload/fields/admin-settings';
import { isLoggedInAccess } from '@/payload/access/is-logged-in-access';
import { I18nCollection } from '@/lib/i18nCollection';
import { defaultCollectionAccess } from '@/payload/access/default-collection-access';

export const Levels: CollectionConfig = {
  slug: 'level',
  admin: {
    group: I18nCollection.collectionGroup.settings,
    useAsTitle: 'level',
  },
  access: {
    read: defaultCollectionAccess,
    create: isLoggedInAccess,
    update: defaultCollectionAccess,
    delete: defaultCollectionAccess,
  },
  fields: [
    {
      type: 'text',
      name: 'level',
      localized: true,
    },
    {
      type: 'textarea',
      name: 'description',
      localized: true,
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
