import { FieldHook } from 'payload'

import { hasSuperAdminRole } from '@/payload/access/utils/hasSuperAdminRole'
import { getIdFromRelation } from '@/payload/utilities/getIdFromRelation'

export const beforeChangeHook: FieldHook = async ({ data, req, req: { user } }) => {
  if (!user || !req.user) return undefined

  if (hasSuperAdminRole(req.user) && data?.organisation) {
    return data.organisation
  }

  const selectedOrganisation = getIdFromRelation(user.selectedOrganisation)

  if (selectedOrganisation) {
    return selectedOrganisation
  }

  // If no organisation is selected, return 1 - this is the default organisation and prevents entries from going missing
  return 1
}
