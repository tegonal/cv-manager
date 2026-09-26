import { CollectionAfterLoginHook } from 'payload'

import { getSelectedOrganisation } from '@/payload/access/utils/get-selected-organisation'
import { getIdFromRelation } from '@/payload/utilities/get-id-from-relation'
import { User } from '@/types/payload-types'

// Selects the first organisation of the user when none is selected or the user left the selected one
export const recordSelectedOrganisation: CollectionAfterLoginHook<User> = async ({ req, user }) => {
  if (getSelectedOrganisation(user)) {
    return user
  }

  const firstOrganisation = getIdFromRelation(user.organisations?.[0]?.organisation)
  const selectedOrganisation = typeof firstOrganisation === 'number' ? firstOrganisation : null

  if (getIdFromRelation(user.selectedOrganisation) === selectedOrganisation) {
    return user
  }

  if (!selectedOrganisation) {
    req.payload.logger.warn({ msg: `User ${user.id} is not a member of any organisation` })
  }

  try {
    await req.payload.update({
      collection: 'users',
      data: { selectedOrganisation },
      id: user.id,
      req,
    })
  } catch (err: unknown) {
    req.payload.logger.error(`Error recording selected organisation for user ${user.id}: ${err}`)
  }

  return user
}
