import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { getPayload, UnauthorizedError } from 'payload'

/**
 * For server actions: resolves Payload and the user of the current request, throws if nobody is
 * logged in. Local API calls made on the user's behalf must pass `user` and `overrideAccess: false`,
 * the Local API skips access control otherwise.
 */
export const getAuthenticatedPayload = async () => {
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: await headers() })

  if (!user) {
    throw new UnauthorizedError()
  }

  return { payload, user }
}
