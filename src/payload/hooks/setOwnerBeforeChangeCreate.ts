import { CollectionBeforeChangeHook } from 'payload'
import { logger } from '@/lib/logger'

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
