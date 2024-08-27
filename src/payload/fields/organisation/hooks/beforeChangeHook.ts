import { isAdmin } from '@/payload/utilities/isAdmin';
import { getIdFromRelation } from '@/payload/utilities/getIdFromRelation';
import { FieldHook } from 'payload';

export const beforeChangeHook: FieldHook = async ({ req, req: { user }, data }) => {
  if (!user || !req.user) return undefined;

  req.payload.logger.info({ msg: 'organisationField.beforeChangeHook', user, data });

  if (isAdmin(req.user) && data?.organisation) {
    return data.organisation;
  }

  const selectedOrganisation = getIdFromRelation(user.selectedOrganisation);

  if (selectedOrganisation) {
    return selectedOrganisation;
  }

  // If no organisation is selected, return 1 - this is the default organisation and prevents entries from going missing
  return 1;
};
