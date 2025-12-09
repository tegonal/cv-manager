import { CollectionAfterLoginHook } from 'payload'

import { getIdFromRelation } from '@/payload/utilities/get-id-from-relation'
import { User } from '@/types/payload-types'

export const recordSelectedOrganisation: CollectionAfterLoginHook<User> = async ({ req, user }) => {
  if (!user.selectedOrganisation) {
    req.payload.logger.info({
      msg: `Setting selected organisation for user ${user.id} because there is none`,
    })

    req.payload.logger.info({
      msg: `No selected organisation found for user ${user.id}, setting a default`,
    })

    if (user.organisations?.length === 0) {
      req.payload.logger.error({
        msg: `No organisations assigned to user ${user.id}, cannot set default!`,
      })
      return
    }

    const selectedOrgId = getIdFromRelation(user.organisations?.[0]?.organisation)
    if (!selectedOrgId || typeof selectedOrgId !== 'number') {
      req.payload.logger.error({
        msg: `Cannot find organisation ID for user ${user.id}, cannot set default!`,
      })
      return
    }
    try {
      await req.payload.update({
        collection: 'users',
        data: {
          selectedOrganisation: 1,
        },
        id: user.id,
        req,
      })
    } catch (err: unknown) {
      req.payload.logger.error(`Error recording selected organisation for user ${user.id}: ${err}`)
    }
  }

  return user
}
