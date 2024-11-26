import type { Access } from 'payload';
import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants';
import { getIdFromRelation } from '@/payload/utilities/getIdFromRelation';

// the user must be an admin of the organisation being accessed
export const organisationAdminAccess: Access = async ({ req, req: { user } }) => {
  // an array of organisation IDs that the user is a super admin of
  const orgIds = user?.organisations
    ?.filter((org) => org.roles.includes(ROLE_SUPER_ADMIN))
    .map((org) => getIdFromRelation(org.organisation));

  req.payload.logger.info({
    msg: `organisationAdminAccess: User is super admin of organisations: ${orgIds}`,
  });

  return {
    id: {
      in: orgIds,
    },
  };
};
