import { CollectionConfig } from 'payload'

import { I18nCollection } from '@/lib/i18n-collection'
import { defaultCollectionAccess } from '@/payload/access/default-collection-access'
import { hasSelectedOrganisationAccess } from '@/payload/access/has-selected-organisation-access'
import { adminSettingsField } from '@/payload/fields/admin-settings'

export const Levels: CollectionConfig = {
  access: {
    create: hasSelectedOrganisationAccess,
    delete: defaultCollectionAccess,
    read: defaultCollectionAccess,
    update: defaultCollectionAccess,
  },
  admin: {
    group: I18nCollection.collectionGroup.cvInformation,
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
