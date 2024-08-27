import type { Access, FieldAccess } from 'payload';

import { checkUserRoles } from '@/payload/utilities/checkUserRoles';
import { User } from '../../types/payload-types';
import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants';

export const superAdmins: Access = ({ req: { user } }) => checkUserRoles([ROLE_SUPER_ADMIN], user);

const log = false;

export const superAdminFieldAccess: FieldAccess<User> = ({ req: { user, payload } }) => {
  const isSuperAdmin = checkUserRoles([ROLE_SUPER_ADMIN], user);
  log && payload.logger.info({ msg: `User is super admin: ${isSuperAdmin}` });
  return isSuperAdmin;
};
