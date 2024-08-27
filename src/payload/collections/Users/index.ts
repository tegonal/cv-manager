import { CollectionConfig } from 'payload';
import { adminsAndSelf } from '@/payload/collections/Users/access/adminsAndSelf';
import { anyone } from '@/payload/access/anyone';
import { isSuperOrOrganisationAdmin } from '@/payload/collections/Users/utilities/isSuperOrOrganisationAdmin';
import { loginAfterCreate } from '@/payload/collections/Users/hooks/loginAfterCreate';
import { recordSelectedOrganisation } from '@/payload/collections/Users/hooks/recordSelectedOrganisation';
import { superAdminFieldAccess } from '@/payload/access/superAdmins';
import { ROLE_SUPER_ADMIN, ROLE_USER } from '@/payload/utilities/constants';
import { organisationAdmins } from '@/payload/collections/Users/access/organisationAdmins';
import { I18nCollection } from '@/lib/i18nCollection';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    group: I18nCollection.collectionGroup.settings,
    useAsTitle: 'email',
  },
  access: {
    read: adminsAndSelf,
    create: anyone,
    update: adminsAndSelf,
    delete: adminsAndSelf,
    admin: isSuperOrOrganisationAdmin,
  },
  hooks: {
    afterChange: [loginAfterCreate],
    afterLogin: [recordSelectedOrganisation],
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      access: {
        create: superAdminFieldAccess,
        update: superAdminFieldAccess,
        read: superAdminFieldAccess,
      },
      options: [
        {
          label: 'Admin',
          value: ROLE_SUPER_ADMIN,
        },
        {
          label: 'User',
          value: ROLE_USER,
        },
      ],
    },
    {
      name: 'organisations',
      type: 'array',
      label: 'Organisations',
      interfaceName: 'UserOrganisations',
      access: {
        create: organisationAdmins,
        update: organisationAdmins,
        read: organisationAdmins,
      },
      fields: [
        {
          name: 'organisation',
          type: 'relationship',
          relationTo: 'organisations',
          required: true,
        },
        {
          name: 'roles',
          type: 'select',
          hasMany: true,
          required: true,
          options: [
            {
              label: 'Admin',
              value: ROLE_SUPER_ADMIN,
            },
            {
              label: 'Users',
              value: ROLE_USER,
            },
          ],
        },
      ],
    },
    {
      name: 'selectedOrganisation',
      type: 'relationship',
      relationTo: 'organisations',
      index: true,
      access: {
        create: () => false,
        read: organisationAdmins,
        update: superAdminFieldAccess,
      },
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
