import type { FieldAccess } from 'payload';

import { checkUserRoles } from '@/payload/access/utils/checkUserRoles';
import { checkOrganisationRoles } from './utils/checkOrganisationRoles';
import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants';
import { User } from '@/types/payload-types';
import { isNumber } from 'lodash-es';

export const isOrganisationAdminFieldAccess: FieldAccess<User> = async ({ req: { user }, doc }) => {
  return !!(
    checkUserRoles([ROLE_SUPER_ADMIN], user) ||
    doc?.organisations?.some(({ organisation }) => {
      if (!isNumber(organisation)) {
        throw new Error('organisationAdmins: The organisation ID must be a number');
      }
      return checkOrganisationRoles([ROLE_SUPER_ADMIN], user, organisation);
    })
  );
};
