import type { FieldAccess } from 'payload'

import { checkUserRoles } from '@/payload/access/utils/checkUserRoles'
import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants'
import { User } from '@/types/payload-types'

export const superAdminFieldAccess: FieldAccess<User> = ({ req: { payload, user } }) => {
  const isSuperAdmin = checkUserRoles([ROLE_SUPER_ADMIN], user)
  // payload.logger.info({ msg: `User is super admin: ${isSuperAdmin}` });
  return isSuperAdmin
}
