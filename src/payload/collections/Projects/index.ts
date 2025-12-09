import { CollectionConfig } from 'payload'

import { I18nCollection } from '@/lib/i18n-collection'
import { defaultCollectionAccess } from '@/payload/access/default-collection-access'
import { isLoggedInAccess } from '@/payload/access/is-logged-in-access'
import { adminSettingsField } from '@/payload/fields/admin-settings'

import { textLinkOptional } from '../CVs/fields/common-text-fields'

export const Projects: CollectionConfig = {
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
      label: I18nCollection.fieldLabel.name,
      localized: true,
      name: 'name',
      type: 'text',
    },
    textLinkOptional,
    {
      label: I18nCollection.fieldLabel.description,
      localized: true,
      name: 'description',
      type: 'richText',
    },
    adminSettingsField({ sidebar: true }),
  ],
  slug: 'project',
}
