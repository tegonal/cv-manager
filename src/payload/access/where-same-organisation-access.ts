import { Access } from 'payload'

import { getIdFromRelation } from '@/payload/utilities/get-id-from-relation'

export const whereSameOrganisationAccess: Access = async ({
  id,
  req,
  req: { payload, user, ...rest },
}) => {
  const userLastLoggedInOrgId = getIdFromRelation(user?.selectedOrganisation)

  if (!userLastLoggedInOrgId) {
    req.payload.logger.info({ msg: 'whereSameOrganisationAccess: No organisation selected' })
    return false
  }

  return {
    organisation: {
      equals: userLastLoggedInOrgId,
    },
  }
}
