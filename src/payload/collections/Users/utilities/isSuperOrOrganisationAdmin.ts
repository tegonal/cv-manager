import type { PayloadRequest } from 'payload';

import { isAdmin } from '@/payload/utilities/isAdmin';
import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants';
import { getIdFromRelation } from '@/payload/utilities/getIdFromRelation';

const logs = false;

export const isSuperOrOrganisationAdmin = async (args: {
  req: PayloadRequest;
}): Promise<boolean> => {
  const {
    req,
    req: { user, payload },
  } = args;

  // always allow super admins through
  if (isAdmin(user)) {
    return true;
  }

  // read `req.headers.host`, lookup the organisation by `domain` to ensure it exists, and check if the user is an admin of that organisation
  const foundOrganisations = await payload.find({
    collection: 'organisations',
    depth: 0,
    req,
  });

  // if this organisation does not exist, deny access
  if (foundOrganisations.totalDocs === 0) {
    if (logs) {
      const msg = `No organisation found`;
      payload.logger.info({ msg });
    }
    return false;
  }

  if (logs) {
    const msg = `Found organisation: '${foundOrganisations.docs?.[0]?.name}', checking if user is an organisation admin`;
    payload.logger.info({ msg });
  }

  // finally check if the user is an admin of this organisation
  const organisationWithUser = user?.organisations?.find(
    ({ organisation: userOrganisation }) =>
      getIdFromRelation(userOrganisation) === foundOrganisations.docs[0].id,
  );

  if (organisationWithUser?.roles?.some((role) => role === ROLE_SUPER_ADMIN)) {
    if (logs) {
      const msg = `User is an admin of ${foundOrganisations.docs[0].name}, allowing access`;
      payload.logger.info({ msg });
    }

    return true;
  }

  if (logs) {
    const msg = `User is not an admin of ${foundOrganisations.docs[0].name}, denying access`;
    payload.logger.info({ msg });
  }

  return false;
};
