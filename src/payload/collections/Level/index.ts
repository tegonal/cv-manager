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
      label: I18nCollection.fieldLabel.level,
      localized: true,
      name: 'level',
      type: 'text',
    },
    {
      label: I18nCollection.fieldLabel.description,
      localized: true,
      name: 'description',
      type: 'textarea',
    },
    {
      hasMany: true,
      label: I18nCollection.fieldLabel.levelType,
      name: 'levelType',
      options: [
        { label: I18nCollection.fieldLabel.language, value: 'language' },
        { label: I18nCollection.fieldLabel.skill, value: 'skill' },
      ],
      type: 'select',
    },
    {
      label: I18nCollection.fieldLabel.points,
      name: 'points',
      type: 'number',
    },
    adminSettingsField({ sidebar: true }),
  ],
  labels: {
    plural: I18nCollection.fieldLabel.levels,
    singular: I18nCollection.fieldLabel.level,
  },
  slug: 'level',
}
