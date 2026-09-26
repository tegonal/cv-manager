import { GlobalConfig } from 'payload'

import { I18nCollection } from '@/lib/i18n-collection'
import { isLoggedInAccess } from '@/payload/access/is-logged-in-access'
import { isSuperAdminAccess } from '@/payload/access/is-super-admin-access'

export const CompanyInfo: GlobalConfig = {
  access: {
    // The PDF export reads the settings server-side, the admin panel needs a login anyway
    read: isLoggedInAccess,
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
