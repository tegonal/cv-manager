import { logger } from '@/lib/logger'
import { CollectionBeforeChangeHook } from 'payload'

export const setOwnerBeforeChangeCreate: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
}) => {
  if (operation === 'create' && req?.user) {
    logger.info('req.user', req.user)
    data.createdBy = req.user.id
    return data
  }
}
