import type { Access } from 'payload'

import { checkUserRoles } from '@/payload/access/utils/checkUserRoles'
import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants'

export const isSuperAdminAccess: Access = ({ req: { user } }) =>
  checkUserRoles([ROLE_SUPER_ADMIN], user)
