import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants';
import { Access } from 'payload';

export const isAdminOrCreatedBy: Access = ({ req: { user } }) => {
  // Scenario #1 - Check if user has the 'admin' role
  if (user && user.roles.includes(ROLE_SUPER_ADMIN)) {
    return true;
  }

  // Scenario #2 - Allow only documents with the current user set to the 'createdBy' field
  if (user) {
    // Will return access for only documents that were created by the current user
    return {
      createdBy: {
        equals: user.id,
      },
    };
  }

  // Scenario #3 - Disallow all others
  return false;
};
