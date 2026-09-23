import { CollectionConfig } from 'payload'

import { defaultCollectionAccess } from '@/payload/access/default-collection-access'
import { isLoggedInAccess } from '@/payload/access/is-logged-in-access'
import { assignOrgToUpload } from '@/payload/collections/hooks/assign-org-to-upload'
import { adminSettingsField } from '@/payload/fields/admin-settings'

export const Media: CollectionConfig = {
  access: {
    create: isLoggedInAccess,
    delete: defaultCollectionAccess,
    read: defaultCollectionAccess,
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
    // Files are stored in S3 only (see s3Storage in payload.config.ts)
    disableLocalStorage: true,
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
  },
}
