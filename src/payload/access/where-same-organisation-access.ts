import { Access } from 'payload'
import { getIdFromRelation } from '@/payload/utilities/getIdFromRelation'

export const whereSameOrganisationAccess: Access = async ({
  req,
  req: { user, payload, ...rest },
  id,
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
