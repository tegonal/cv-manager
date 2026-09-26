import { Access } from 'payload'

import { getSelectedOrganisation } from '@/payload/access/utils/get-selected-organisation'

// Records of the organisation the user works in
export const whereSameOrganisationAccess: Access = ({ req: { user } }) => {
  const selectedOrganisation = getSelectedOrganisation(user)

  if (!selectedOrganisation) {
    return false
  }

  return {
    organisation: {
      equals: selectedOrganisation,
    },
  }
}
