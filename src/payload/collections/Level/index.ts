import { CollectionConfig } from 'payload'

import { I18nCollection } from '@/lib/i18n-collection'
import { defaultCollectionAccess } from '@/payload/access/default-collection-access'
import { isLoggedInAccess } from '@/payload/access/is-logged-in-access'
import { adminSettingsField } from '@/payload/fields/admin-settings'

export const Levels: CollectionConfig = {
  access: {
    create: isLoggedInAccess,
    delete: defaultCollectionAccess,
    read: defaultCollectionAccess,
    update: defaultCollectionAccess,
  },
  admin: {
    group: I18nCollection.collectionGroup.settings,
    useAsTitle: 'level',
  },
  fields: [
    {
      localized: true,
      name: 'level',
      type: 'text',
    },
    {
      localized: true,
      name: 'description',
      type: 'textarea',
    },
    {
      hasMany: true,
      name: 'levelType',
      options: [
        { label: 'Language', value: 'language' },
        { label: 'Skill', value: 'skill' },
      ],
      type: 'select',
    },
    {
      name: 'points',
      type: 'number',
    },
    adminSettingsField({ sidebar: true }),
  ],
  slug: 'level',
}
