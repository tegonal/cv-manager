import type { Access, Where } from 'payload'

import { getIdFromRelation } from '@/payload/utilities/get-id-from-relation'

// The user itself and the members of the organisation the user has selected
export const whereSelectedOrganisationMembersAccess: Access = ({ req: { user } }) => {
  const selectedOrganisation = getIdFromRelation(user?.selectedOrganisation)

  if (!user || !selectedOrganisation) {
    return false
  }

  const where: Where = {
    or: [
      { id: { equals: user.id } },
      { 'organisations.organisation': { equals: selectedOrganisation } },
    ],
  }

  return where
}
