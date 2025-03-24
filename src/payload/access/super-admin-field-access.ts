import type { FieldAccess } from 'payload'
import { User } from '@/types/payload-types'
import { checkUserRoles } from '@/payload/access/utils/checkUserRoles'
import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants'

export const superAdminFieldAccess: FieldAccess<User> = ({ req: { user, payload } }) => {
  const isSuperAdmin = checkUserRoles([ROLE_SUPER_ADMIN], user)
  // payload.logger.info({ msg: `User is super admin: ${isSuperAdmin}` });
  return isSuperAdmin
}
