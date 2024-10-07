import { CollectionConfig } from 'payload';
import { I18nCollection } from '@/lib/i18nCollection';
import { superAdmins } from '@/payload/access/superAdmins';
import { organisationAdmins } from '@/payload/collections/Organisations/access/organisationAdmins';
import { createdByField } from '@/payload/fields/created-by';
import { updatedByField } from '@/payload/fields/updated-by';
import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants';

export const Organisations: CollectionConfig = {
  slug: 'organisations',
  labels: {
    plural: I18nCollection.fieldLabel.organisations,
    singular: I18nCollection.fieldLabel.organisation,
  },
  admin: {
    group: I18nCollection.collectionGroup.settings,
    useAsTitle: 'name',
    hidden: (user) => {
      return !user?.user?.roles?.includes(ROLE_SUPER_ADMIN);
    },
  },
  access: {
    create: superAdmins,
    read: organisationAdmins,
    update: organisationAdmins,
    delete: superAdmins,
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
};
