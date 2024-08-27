import { Payload } from 'payload';
import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants';

export const seedDevUser = async (payload: Payload) => {
  // Create a default user if one doesn't exist
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  });

  if (existingUsers.docs.length === 0) {
    const testOrg = await payload.create({
      collection: 'organisations',
      data: {
        name: 'Test Organisation',
      },
    });

    await payload.create({
      collection: 'users',
      data: {
        roles: [ROLE_SUPER_ADMIN],
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@test.com',
        password: 'admin',
        organisations: [
          {
            organisation: testOrg.id,
            roles: [ROLE_SUPER_ADMIN],
          },
        ],
      },
    });
  }
};
