import { CollectionConfig } from 'payload'

import { I18nCollection } from '@/lib/i18nCollection'
import { defaultCollectionAccess } from '@/payload/access/default-collection-access'
import { isLoggedInAccess } from '@/payload/access/is-logged-in-access'
import { adminSettingsField } from '@/payload/fields/admin-settings'

export const Companies: CollectionConfig = {
  access: {
    create: isLoggedInAccess,
    delete: defaultCollectionAccess,
    read: defaultCollectionAccess,
    update: defaultCollectionAccess,
  },
  admin: {
    group: I18nCollection.collectionGroup.settings,
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    adminSettingsField({ sidebar: true }),
  ],
  slug: 'company',
}
