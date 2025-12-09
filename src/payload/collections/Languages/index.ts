import { CollectionConfig } from 'payload'

import { I18nCollection } from '@/lib/i18n-collection'
import { defaultCollectionAccess } from '@/payload/access/default-collection-access'
import { isLoggedInAccess } from '@/payload/access/is-logged-in-access'
import { adminSettingsField } from '@/payload/fields/admin-settings'

export const Languages: CollectionConfig = {
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
      localized: true,
      name: 'name',
      type: 'text',
    },
    adminSettingsField({ sidebar: true }),
  ],
  labels: {
    plural: I18nCollection.fieldLabel.languages,
    singular: I18nCollection.fieldLabel.language,
  },
  slug: 'langs',
}
