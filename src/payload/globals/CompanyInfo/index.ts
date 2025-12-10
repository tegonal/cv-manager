import { GlobalConfig } from 'payload'

import { I18nCollection } from '@/lib/i18n-collection'
import { isSuperAdminAccess } from '@/payload/access/is-super-admin-access'

export const CompanyInfo: GlobalConfig = {
  access: {
    read: () => true,
    update: isSuperAdminAccess,
  },
  admin: {
    group: I18nCollection.collectionGroup.settings,
  },
  fields: [
    {
      label: {
        de: 'Firmenname',
        en: 'Company Name',
      },
      name: 'name',
      required: true,
      type: 'text',
    },
    {
      label: {
        de: 'Adresse',
        en: 'Address',
      },
      name: 'address',
      type: 'text',
    },
    {
      label: {
        de: 'Stadt',
        en: 'City',
      },
      name: 'city',
      type: 'text',
    },
    {
      label: {
        de: 'Webseite',
        en: 'Website',
      },
      name: 'url',
      type: 'text',
    },
  ],
  label: {
    de: 'Firmeninformationen',
    en: 'Company Info',
  },
  slug: 'company-info',
}
