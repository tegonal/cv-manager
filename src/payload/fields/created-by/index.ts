import type { Field } from 'payload'

import { superAdminFieldAccess } from '@/payload/access/super-admin-field-access'

import { organisationFieldAdminAccess } from './access/admin'
import { beforeChangeHook } from './hooks/before-change-hook'

export const createdByField: Field = {
  access: {
    create: superAdminFieldAccess,
    read: organisationFieldAdminAccess,
    update: superAdminFieldAccess,
  },
  hooks: {
    beforeChange: [beforeChangeHook],
  },
  index: true,
  name: 'createdBy',
  relationTo: 'users',
  type: 'relationship',
}
