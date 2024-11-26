import type { Field } from 'payload';

import { organisationFieldAdminAccess } from './access/admin';
import { beforeChangeHook } from './hooks/beforeChangeHook';
import { superAdminFieldAccess } from '@/payload/access/super-admin-field-access';

export const createdByField: Field = {
  name: 'createdBy',
  type: 'relationship',
  relationTo: 'users',
  index: true,
  access: {
    create: superAdminFieldAccess,
    read: organisationFieldAdminAccess,
    update: superAdminFieldAccess,
  },
  hooks: {
    beforeChange: [beforeChangeHook],
  },
};
