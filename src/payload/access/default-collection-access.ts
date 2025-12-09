import { Access } from 'payload'

import { isLoggedInAccess } from '@/payload/access/is-logged-in-access'
import { isSuperAdminAccess } from '@/payload/access/is-super-admin-access'
import { whereSameOrganisationAccess } from '@/payload/access/where-same-organisation-access'

export const defaultCollectionAccess: Access = async (args) => {
  if (!isLoggedInAccess(args)) {
    return false
  }

  if (isSuperAdminAccess(args)) {
    return true
  }

  if (whereSameOrganisationAccess(args)) {
    return whereSameOrganisationAccess(args)
  }

  return false
}
