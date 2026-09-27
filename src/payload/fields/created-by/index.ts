import type { Field } from 'payload'

import { I18nCollection } from '@/lib/i18n-collection'
import { recordOrganisationAdminFieldAccess } from '@/payload/access/record-organisation-admin-field-access'
import { superAdminFieldAccess } from '@/payload/access/super-admin-field-access'

import { beforeChangeHook } from './hooks/before-change-hook'

export const createdByField: Field = {
  access: {
    create: superAdminFieldAccess,
    read: recordOrganisationAdminFieldAccess,
    update: superAdminFieldAccess,
  },
  hooks: {
    beforeChange: [beforeChangeHook],
  },
  index: true,
  label: I18nCollection.fieldLabel.createdBy,
  name: 'createdBy',
  relationTo: 'users',
  type: 'relationship',
}
