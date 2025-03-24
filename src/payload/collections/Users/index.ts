import { Access, CollectionConfig } from 'payload'
import { I18nCollection } from '@/lib/i18nCollection'
import { recordSelectedOrganisation } from '@/payload/collections/Users/hooks/recordSelectedOrganisation'
import { isOrganisationAdminFieldAccess } from '@/payload/access/is-organisation-admin-field-access'
import { ROLE_SUPER_ADMIN, ROLE_USER } from '@/payload/utilities/constants'
import { userDefaultsAfterCreate } from '@/payload/collections/Users/hooks/userDefaultsAfterCreate'
import { isOrganisationAdminAccess } from '@/payload/access/is-organisation-admin-access'
import { superAdminFieldAccess } from '@/payload/access/super-admin-field-access'
import { whereOwnUserAccess } from '@/payload/access/where-own-user-access'
import { isSuperAdminAccess } from '@/payload/access/is-super-admin-access'
import { isLoggedInAccess } from '@/payload/access/is-logged-in-access'

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
  slug: 'users',
  auth: true,
  admin: {
    group: I18nCollection.collectionGroup.settings,
    useAsTitle: 'email',
    // hidden: (user) => {
    //   return !user?.user?.roles?.includes(ROLE_SUPER_ADMIN);
    // },
  },
  access: {
    read: readAccess,
    create: createAccess,
    update: updateAccess,
    delete: deleteAccess,
  },
  hooks: {
    afterChange: [userDefaultsAfterCreate],
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
      name: 'email',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      access: {
        create: superAdminFieldAccess,
        update: superAdminFieldAccess,
        // read: superAdminFieldAccess,
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
        create: isOrganisationAdminFieldAccess,
        update: isOrganisationAdminFieldAccess,
        // read: organisationAdmins,
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
        read: isOrganisationAdminFieldAccess,
        update: superAdminFieldAccess,
      },
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
