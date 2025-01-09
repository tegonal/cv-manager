import { CollectionConfig } from 'payload';
import { isLoggedInAccess } from '@/payload/access/is-logged-in-access';
import { assignOrgToUpload } from '@/payload/collections/hooks/assignOrgToUpload';
import { adminSettingsField } from '@/payload/fields/admin-settings';
import { defaultCollectionAccess } from '@/payload/access/default-collection-access';
import { PRINTER_HEADER_KEY } from '@/payload/utilities/constants';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: (args) => {
      const printerSecret = args.req.headers.get(PRINTER_HEADER_KEY);
      if (printerSecret === process.env.PRINTER_SECRET) {
        return true;
      }
      return defaultCollectionAccess(args);
    },
    create: isLoggedInAccess,
    update: defaultCollectionAccess,
    delete: defaultCollectionAccess,
  },
  hooks: {
    beforeChange: [assignOrgToUpload],
  },
  upload: {
    imageSizes: [
      {
        name: 'thumbnail',
        width: 200,
        height: 200,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    adminSettingsField({ sidebar: true }),
  ],
};
