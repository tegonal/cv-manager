import type { Access, Where } from 'payload'

import { getSelectedOrganisation } from '@/payload/access/utils/get-selected-organisation'

// The user itself and the members of the organisation the user works in
export const whereSelectedOrganisationMembersAccess: Access = ({ req: { user } }) => {
  const selectedOrganisation = getSelectedOrganisation(user)

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
