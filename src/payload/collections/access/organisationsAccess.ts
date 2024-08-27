import type { Access } from 'payload';

import { isAdmin } from '@/payload/utilities/isAdmin';
import { getIdFromRelation } from '@/payload/utilities/getIdFromRelation';

export const organisationsAccess: Access = ({ req: { user }, data }) => {
  const dataOrgId = getIdFromRelation(data?.organisation);
  const userLastLoggedInOrgId = getIdFromRelation(user?.selectedOrganisation);
  return (
    userLastLoggedInOrgId === dataOrgId ||
    (!userLastLoggedInOrgId && isAdmin(user)) || {
      organisation: {
        equals: userLastLoggedInOrgId,
      },
    }
  );
};
