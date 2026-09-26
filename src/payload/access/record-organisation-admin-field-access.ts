import type { FieldAccess } from 'payload'

import { checkOrganisationRoles } from '@/payload/access/utils/check-organisation-roles'
import { checkUserRoles } from '@/payload/access/utils/check-user-roles'
import { ORGANISATION_ROLE_ADMIN, ROLE_SUPER_ADMIN } from '@/payload/utilities/constants'
import { getIdFromRelation } from '@/payload/utilities/get-id-from-relation'

// Super admins, and admins of the organisation the record belongs to
export const recordOrganisationAdminFieldAccess: FieldAccess = ({ doc, req: { user } }) => {
  if (checkUserRoles([ROLE_SUPER_ADMIN], user)) {
    return true
  }

  const organisation = getIdFromRelation(doc?.organisation)
  return (
    typeof organisation === 'number' &&
    checkOrganisationRoles([ORGANISATION_ROLE_ADMIN], user, organisation)
  )
}
