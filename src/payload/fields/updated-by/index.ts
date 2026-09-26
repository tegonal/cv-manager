import type { Field } from 'payload'

import { recordOrganisationAdminFieldAccess } from '@/payload/access/record-organisation-admin-field-access'
import { superAdminFieldAccess } from '@/payload/access/super-admin-field-access'

import { beforeChangeHook } from './hooks/before-change-hook'

export const updatedByField: Field = {
  access: {
    create: superAdminFieldAccess,
    read: recordOrganisationAdminFieldAccess,
    update: superAdminFieldAccess,
  },
  hooks: {
    beforeChange: [beforeChangeHook],
  },
  index: true,
  name: 'updatedBy',
  relationTo: 'users',
  type: 'relationship',
}
