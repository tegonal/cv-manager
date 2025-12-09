import { Payload } from 'payload'

import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants'

export const seedDevUser = async (payload: Payload) => {
  // Create a default user if one doesn't exist
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (existingUsers.docs.length === 0) {
    payload.logger.warn(
      'No existing user, creating default user "admin@test.com" with password "admin". Please change immediately.',
    )
    const testOrg = await payload.create({
      collection: 'organisations',
      data: {
        name: 'Test Organisation',
      },
    })

    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@test.com',
        firstName: 'Admin',
        lastName: 'User',
        organisations: [
          {
            organisation: testOrg.id,
            roles: [ROLE_SUPER_ADMIN],
          },
        ],
        password: 'admin',
        roles: [ROLE_SUPER_ADMIN],
      },
    })
  }
}
