import { checkUserRoles } from './checkUserRoles';
import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants';
import { User } from '@/types/payload-types';

export const hasSuperAdminRole = (user: User | null): boolean =>
  checkUserRoles([ROLE_SUPER_ADMIN], user);
