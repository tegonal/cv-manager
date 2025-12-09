import type { Field } from 'payload'

import { superAdminFieldAccess } from '@/payload/access/super-admin-field-access'

import { organisationFieldAdminAccess } from './access/admin'
import { beforeChangeHook } from './hooks/beforeChangeHook'

export const updatedByField: Field = {
  access: {
    create: superAdminFieldAccess,
    read: organisationFieldAdminAccess,
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
