import type { Access } from 'payload'

import { checkOrganisationRoles } from '@/payload/access/utils/check-organisation-roles'
import { getSelectedOrganisation } from '@/payload/access/utils/get-selected-organisation'
import { ORGANISATION_ROLE_ADMIN } from '@/payload/utilities/constants'

// The user is admin of the organisation they work in
export const isOrganisationAdminAccess: Access = ({ req: { user } }) => {
  const selectedOrganisation = getSelectedOrganisation(user)

  return Boolean(
    selectedOrganisation &&
    checkOrganisationRoles([ORGANISATION_ROLE_ADMIN], user, selectedOrganisation),
  )
}
