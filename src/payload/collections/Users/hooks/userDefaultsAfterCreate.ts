import { CollectionAfterChangeHook } from 'payload'

import { Users } from '@/payload/collections/Users'
import { ROLE_USER } from '@/payload/utilities/constants'
import { User } from '@/types/payload-types'

export const userDefaultsAfterCreate: CollectionAfterChangeHook<User> = async ({
  collection,
  doc,
  operation,
  req,
}) => {
  if (collection.slug !== Users.slug) {
    req.payload.logger.warn({ msg: `Skipping defaultsAfterCreate hook for ${collection.slug}` })
  }

  if (operation === 'create') {
    const { organisations, roles, selectedOrganisation } = doc
    let updatedDoc = doc

    if (!roles || roles.length === 0) {
      req.payload.logger.info({ msg: 'Setting default role to user' })
      await req.payload.update({
        collection: 'users',
        data: {
          roles: [ROLE_USER],
        },
        id: doc.id,
        req,
      })
    }

    if (!organisations || organisations.length === 0) {
      req.payload.logger.info({ msg: 'Setting default organisation to 1' })
      updatedDoc.organisations = [
        {
          organisation: 1,
          roles: [ROLE_USER],
        },
      ]
      await req.payload.update({
        collection: 'users',
        data: {
          organisations: [
            {
              organisation: 1,
              roles: [ROLE_USER],
            },
          ],
        },
        id: doc.id,
        req,
      })
    }

    if (!selectedOrganisation) {
      req.payload.logger.info({ msg: 'Setting default selected organisation to 1' })
      await req.payload.update({
        collection: 'users',
        data: {
          selectedOrganisation: 1,
        },
        id: doc.id,
        req,
      })
    }
  }
}
