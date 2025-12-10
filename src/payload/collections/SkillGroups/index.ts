import { CollectionConfig } from 'payload'

import { I18nCollection } from '@/lib/i18n-collection'
import { defaultCollectionAccess } from '@/payload/access/default-collection-access'
import { isLoggedInAccess } from '@/payload/access/is-logged-in-access'
import { adminSettingsField } from '@/payload/fields/admin-settings'

export const SkillGroups: CollectionConfig = {
  access: {
    create: isLoggedInAccess,
    delete: defaultCollectionAccess,
    read: defaultCollectionAccess,
    update: defaultCollectionAccess,
  },
  admin: {
    group: I18nCollection.collectionGroup.cvInformation,
    useAsTitle: 'name',
  },
  fields: [
    {
      localized: true,
      name: 'name',
      type: 'text',
    },
    adminSettingsField({ sidebar: true }),
  ],
  slug: 'skillGroup',
}
