import { Access, CollectionConfig } from 'payload'

import { I18nCollection } from '@/lib/i18nCollection'
import { isLoggedInAccess } from '@/payload/access/is-logged-in-access'
import { isOrganisationAdminAccess } from '@/payload/access/is-organisation-admin-access'
import { isOrganisationAdminFieldAccess } from '@/payload/access/is-organisation-admin-field-access'
import { isSuperAdminAccess } from '@/payload/access/is-super-admin-access'
import { superAdminFieldAccess } from '@/payload/access/super-admin-field-access'
import { whereOwnUserAccess } from '@/payload/access/where-own-user-access'
import { recordSelectedOrganisation } from '@/payload/collections/Users/hooks/recordSelectedOrganisation'
import { userDefaultsAfterCreate } from '@/payload/collections/Users/hooks/userDefaultsAfterCreate'
import { ROLE_SUPER_ADMIN, ROLE_USER } from '@/payload/utilities/constants'

const readAccess: Access = async (args) => {
  if (!isLoggedInAccess(args)) {
    return false
  }

  if (isSuperAdminAccess(args)) {
    return true
  }

  if (await isOrganisationAdminAccess(args)) {
    return true
  }

  if (whereOwnUserAccess(args)) {
    return whereOwnUserAccess(args)
  }

  return false
}

const createAccess: Access = async (args) => {
  if (!isLoggedInAccess(args)) {
    return false
  }

  if (isSuperAdminAccess(args)) {
    return true
  }

  if (await isOrganisationAdminAccess(args)) {
    return true
  }

  return false
}

const updateAccess: Access = async (args) => {
  if (!isLoggedInAccess(args)) {
    return false
  }

  if (isSuperAdminAccess(args)) {
    return true
  }

  if (await isOrganisationAdminAccess(args)) {
    return true
  }

  if (whereOwnUserAccess(args)) {
    return whereOwnUserAccess(args)
  }

  return false
}

const deleteAccess: Access = async (args) => {
  if (!isLoggedInAccess(args)) {
    return false
  }

  if (isSuperAdminAccess(args)) {
    return true
  }

  return false
}

export const Users: CollectionConfig = {
  access: {
    create: createAccess,
    delete: deleteAccess,
    read: readAccess,
    update: updateAccess,
  },
  admin: {
    group: I18nCollection.collectionGroup.settings,
    useAsTitle: 'email',
    // hidden: (user) => {
    //   return !user?.user?.roles?.includes(ROLE_SUPER_ADMIN);
    // },
  },
  auth: true,
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
      name: 'email',
      required: true,
      type: 'text',
      unique: true,
    },
    {
      access: {
        create: superAdminFieldAccess,
        update: superAdminFieldAccess,
        // read: superAdminFieldAccess,
      },
      hasMany: true,
      name: 'roles',
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
      type: 'select',
    },
    {
      access: {
        create: isOrganisationAdminFieldAccess,
        update: isOrganisationAdminFieldAccess,
        // read: organisationAdmins,
      },
      fields: [
        {
          name: 'organisation',
          relationTo: 'organisations',
          required: true,
          type: 'relationship',
        },
        {
          hasMany: true,
          name: 'roles',
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
          required: true,
          type: 'select',
        },
      ],
      interfaceName: 'UserOrganisations',
      label: 'Organisations',
      name: 'organisations',
      type: 'array',
    },
    {
      access: {
        create: () => false,
        read: isOrganisationAdminFieldAccess,
        update: superAdminFieldAccess,
      },
      admin: {
        position: 'sidebar',
      },
      index: true,
      name: 'selectedOrganisation',
      relationTo: 'organisations',
      type: 'relationship',
    },
  ],
  hooks: {
    afterChange: [userDefaultsAfterCreate],
    afterLogin: [recordSelectedOrganisation],
  },
  slug: 'users',
}
