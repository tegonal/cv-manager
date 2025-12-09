import { CollectionConfig } from 'payload'

import { defaultCollectionAccess } from '@/payload/access/default-collection-access'
import { isLoggedInAccess } from '@/payload/access/is-logged-in-access'
import { assignOrgToUpload } from '@/payload/collections/hooks/assign-org-to-upload'
import { adminSettingsField } from '@/payload/fields/admin-settings'
import { PRINTER_HEADER_KEY } from '@/payload/utilities/constants'

export const Media: CollectionConfig = {
  access: {
    create: isLoggedInAccess,
    delete: defaultCollectionAccess,
    read: (args) => {
      const printerSecret = args.req.headers.get(PRINTER_HEADER_KEY)
      if (printerSecret === process.env.PRINTER_SECRET) {
        return true
      }
      return defaultCollectionAccess(args)
    },
    update: defaultCollectionAccess,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    adminSettingsField({ sidebar: true }),
  ],
  hooks: {
    beforeChange: [assignOrgToUpload],
  },
  slug: 'media',
  upload: {
    // disable local storage if attached to an external S3 storage
    disableLocalStorage: process.env.S3_ENDPOINT !== undefined,
    imageSizes: [
      {
        height: 200,
        name: 'thumbnail',
        position: 'centre',
        width: 200,
      },
      {
        height: 1024,
        name: 'card',
        position: 'centre',
        width: 768,
      },
      {
        height: undefined,
        name: 'tablet',
        position: 'centre',
        width: 1024,
      },
    ],
    mimeTypes: ['image/*'],
    staticDir: process.env.LOCAL_MEDIA_STORAGE_DIR || '/data/media',
  },
}
