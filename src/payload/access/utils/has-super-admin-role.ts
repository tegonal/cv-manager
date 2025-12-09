import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants'
import { User } from '@/types/payload-types'

import { checkUserRoles } from './check-user-roles'

export const hasSuperAdminRole = (user: null | User): boolean =>
  checkUserRoles([ROLE_SUPER_ADMIN], user)
