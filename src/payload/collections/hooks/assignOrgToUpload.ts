import { getIdFromRelation } from '@/payload/utilities/getIdFromRelation';
import { CollectionBeforeChangeHook } from 'payload';

export const assignOrgToUpload: CollectionBeforeChangeHook = async ({ req: { user }, data }) => {
  data.prefix = `${data.prefix}/${getIdFromRelation(user?.selectedOrganisation)}`;
  return data;
};
