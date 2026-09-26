import { CollectionBeforeChangeHook, PayloadRequest } from 'payload'

import { ROLE_SUPER_ADMIN, ROLE_USER } from '@/payload/utilities/constants'
import { getIdFromRelation } from '@/payload/utilities/get-id-from-relation'
import { User } from '@/types/payload-types'

// The oldest organisation, created if there is none yet (first user of a new instance)
const getDefaultOrganisation = async (req: PayloadRequest): Promise<number> => {
  const { docs } = await req.payload.find({
    collection: 'organisations',
    depth: 0,
    limit: 1,
    req,
    sort: 'id',
  })

  if (docs[0]) {
    return docs[0].id
  }

  const organisation = await req.payload.create({
    collection: 'organisations',
    data: { name: 'Default Organisation' },
    req,
  })
  return organisation.id
}

// Default roles and organisation for new users, set before the user is stored
export const userDefaultsBeforeCreate: CollectionBeforeChangeHook<User> = async ({
  data,
  operation,
  req,
}) => {
  if (operation !== 'create') {
    return data
  }

  // The first user of an instance (created through the admin UI) administers it
  const { totalDocs: existingUsers } = await req.payload.count({ collection: 'users', req })
  const role = existingUsers === 0 ? ROLE_SUPER_ADMIN : ROLE_USER

  if (!data.roles?.length) {
    data.roles = [role]
  }

  if (!data.organisations?.length) {
    // New users join the organisation of the user creating them, users created without one
    // (first user, OAuth sign-up) join the default organisation
    const selectedOrganisation = getIdFromRelation(req.user?.selectedOrganisation)
    const organisation = selectedOrganisation
      ? Number(selectedOrganisation)
      : await getDefaultOrganisation(req)
    data.organisations = [{ organisation, roles: [role] }]
  }

  if (!data.selectedOrganisation) {
    data.selectedOrganisation = Number(getIdFromRelation(data.organisations[0].organisation))
  }

  return data
}
