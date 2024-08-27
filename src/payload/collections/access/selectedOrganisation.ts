import type { Access } from 'payload';
import { getIdFromRelation } from '@/payload/utilities/getIdFromRelation';
import { User } from '@/types/payload-types';

export const selectedOrganisation: Access<User> = ({ req: { user }, data }) =>
  getIdFromRelation(user?.selectedOrganisation) === data?.id;
