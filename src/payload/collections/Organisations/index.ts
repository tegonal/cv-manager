import { Access, CollectionConfig } from 'payload'

import { I18nCollection } from '@/lib/i18nCollection'
import { isLoggedInAccess } from '@/payload/access/is-logged-in-access'
import { isSuperAdminAccess } from '@/payload/access/is-super-admin-access'
import { checkOrganisationRoles } from '@/payload/access/utils/checkOrganisationRoles'
import { createdByField } from '@/payload/fields/created-by'
import { updatedByField } from '@/payload/fields/updated-by'
import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants'
import { getIdFromRelation } from '@/payload/utilities/getIdFromRelation'
import { Organisation } from '@/types/payload-types'

const createAccess: Access<Organisation> = async (args) => {
  if (!isLoggedInAccess(args)) {
    return false
  }

  if (await isSuperAdminAccess(args)) {
    return true
  }

  return false
}

const readAccess: Access<Organisation> = (args) => {
  if (!isLoggedInAccess(args)) {
    return false
  }

  if (isSuperAdminAccess(args)) {
    return true
  }

  const selectedOrganisation = getIdFromRelation(args.req.user?.selectedOrganisation)

  if (selectedOrganisation && typeof selectedOrganisation === 'number') {
    return {
      id: {
        equals: selectedOrganisation,
      },
    }
  }

  return false
}

const updateAccess: Access<Organisation> = async (args) => {
  if (!isLoggedInAccess(args)) {
    return false
  }

  const selectedOrganisation = getIdFromRelation(args.req.user?.selectedOrganisation)

  if (
    selectedOrganisation &&
    typeof selectedOrganisation === 'number' &&
    checkOrganisationRoles([ROLE_SUPER_ADMIN], args.req.user, selectedOrganisation)
  ) {
    return {
      id: {
        equals: args.id || selectedOrganisation,
      },
    }
  }

  return false
}

const deleteAccess: Access<Organisation> = async (args) => {
  if (!isLoggedInAccess(args)) {
    return false
  }

  if (await isSuperAdminAccess(args)) {
    return true
  }

  return false
}

export const Organisations: CollectionConfig = {
  access: {
    create: createAccess,
    delete: deleteAccess,
    read: readAccess,
    update: updateAccess,
  },
  admin: {
    group: I18nCollection.collectionGroup.settings,
    useAsTitle: 'name',
  },
  fields: [
    {
      label: I18nCollection.fieldLabel.name,
      name: 'name',
      required: true,
      type: 'text',
    },
    {
      label: I18nCollection.fieldLabel.description,
      name: 'description',
      type: 'textarea',
    },
    createdByField,
    updatedByField,
  ],
  labels: {
    plural: I18nCollection.fieldLabel.organisations,
    singular: I18nCollection.fieldLabel.organisation,
  },
  slug: 'organisations',
}
