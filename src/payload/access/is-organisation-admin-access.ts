import type { Access } from 'payload';
import { getIdFromRelation } from '@/payload/utilities/getIdFromRelation';
import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants';

export const isOrganisationAdminAccess: Access = async ({ req, req: { user, payload } }) => {
  const lastSelectedOrganisation = getIdFromRelation(user?.selectedOrganisation);

  if (!lastSelectedOrganisation) {
    payload.logger.info({ msg: 'isOrganisationAdminAccess: No organisation selected' });
    return false;
  }

  const org = await payload.findByID({
    req,
    collection: 'organisations',
    id: lastSelectedOrganisation,
  });

  if (!org) {
    payload.logger.info({
      msg: 'isOrganisationAdminAccess: No organisation matched with lastSelectedOrganisation',
    });
    return false;
  }

  const roles = user?.organisations?.find(({ organisation }) => {
    return getIdFromRelation(organisation) === lastSelectedOrganisation;
  })?.roles;

  if (roles?.includes(ROLE_SUPER_ADMIN)) {
    payload.logger.info({
      msg: `isOrganisationAdminAccess: User is a super admin`,
    });

    return true;
  }

  payload.logger.info({
    msg: `isOrganisationAdminAccess: User is not an admin of ${org.name}`,
  });

  return false;
};
