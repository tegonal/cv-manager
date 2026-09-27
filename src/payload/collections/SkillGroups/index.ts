import { CollectionConfig } from 'payload'

import { I18nCollection } from '@/lib/i18n-collection'
import { defaultCollectionAccess } from '@/payload/access/default-collection-access'
import { hasSelectedOrganisationAccess } from '@/payload/access/has-selected-organisation-access'
import { adminSettingsField } from '@/payload/fields/admin-settings'

export const SkillGroups: CollectionConfig = {
  access: {
    create: hasSelectedOrganisationAccess,
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
      label: I18nCollection.fieldLabel.name,
      localized: true,
      name: 'name',
      type: 'text',
    },
    adminSettingsField({ sidebar: true }),
  ],
  labels: {
    plural: I18nCollection.fieldLabel.skillGroups,
    singular: I18nCollection.fieldLabel.skillGroup,
  },
  slug: 'skillGroup',
}
