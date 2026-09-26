import { CollectionBeforeChangeHook } from 'payload'

import { ROLE_USER } from '@/payload/utilities/constants'
import { getIdFromRelation } from '@/payload/utilities/get-id-from-relation'
import { User } from '@/types/payload-types'

// Default role and organisation for new users, set before the user is stored
export const userDefaultsBeforeCreate: CollectionBeforeChangeHook<User> = ({
  data,
  operation,
  req,
}) => {
  if (operation !== 'create') {
    return data
  }

  if (!data.roles?.length) {
    data.roles = [ROLE_USER]
  }

  if (!data.organisations?.length) {
    // New users join the organisation of the user creating them. Users created without one
    // (seed, OAuth sign-up) join organisation 1, the default organisation.
    const organisation = Number(getIdFromRelation(req.user?.selectedOrganisation) ?? 1)
    data.organisations = [{ organisation, roles: [ROLE_USER] }]
  }

  if (!data.selectedOrganisation) {
    data.selectedOrganisation = Number(getIdFromRelation(data.organisations[0].organisation))
  }

  return data
}
