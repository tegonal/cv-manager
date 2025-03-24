import { Access, CollectionConfig } from 'payload'
import { I18nCollection } from '@/lib/i18nCollection'
import { isSuperAdminAccess } from '@/payload/access/is-super-admin-access'
import { createdByField } from '@/payload/fields/created-by'
import { updatedByField } from '@/payload/fields/updated-by'
import { isLoggedInAccess } from '@/payload/access/is-logged-in-access'
import { Organisation } from '@/types/payload-types'
import { checkOrganisationRoles } from '@/payload/access/utils/checkOrganisationRoles'
import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants'
import { getIdFromRelation } from '@/payload/utilities/getIdFromRelation'
import { isNumber } from 'lodash-es'

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

  if (selectedOrganisation && isNumber(selectedOrganisation)) {
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
    isNumber(selectedOrganisation) &&
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
  slug: 'organisations',
  labels: {
    plural: I18nCollection.fieldLabel.organisations,
    singular: I18nCollection.fieldLabel.organisation,
  },
  admin: {
    group: I18nCollection.collectionGroup.settings,
    useAsTitle: 'name',
  },
  access: {
    read: readAccess,
    create: createAccess,
    update: updateAccess,
    delete: deleteAccess,
  },
  fields: [
    {
      name: 'name',
      label: I18nCollection.fieldLabel.name,
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: I18nCollection.fieldLabel.description,
      type: 'textarea',
    },
    createdByField,
    updatedByField,
  ],
}
