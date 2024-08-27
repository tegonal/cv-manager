import { Access } from 'payload/config';
import { FieldAccess } from 'payload/types';

export const isAdminOnField: FieldAccess = ({ req: { user } }) => {
  return user && user.role === 'admin';
};

export const isAdminOrCreatedByOnField: FieldAccess = ({ req: { user }, data }) => {
  // Scenario #1 - Check if user has the 'admin' role
  if (user && user.role === 'admin') {
    return true;
  }

  // Scenario #2 - Allow only documents with the current user set to the 'createdBy' field
  if (user) {
    // Will return access for only documents that were created by the current user
    return data?.createdBy === user.id;
  }

  // Scenario #3 - Disallow all others
  return false;
};

export const isAdminOnCollection: Access = ({ req: { user } }) => {
  return user && user.role === 'admin';
};
