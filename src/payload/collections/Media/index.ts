import { setOwnerBeforeChangeCreate } from '@/payload/collections/hooks/setOwnerBeforeChangeCreate';
import { isAdminOrCreatedBy } from '@/payload/collections/access/isAdminOrCreatedBy';
import { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
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
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      access: {
        update: () => false,
      },
    },
  ],
  hooks: {
    beforeChange: [setOwnerBeforeChangeCreate],
  },
  access: {
    read: isAdminOrCreatedBy,
    update: isAdminOrCreatedBy,
    delete: isAdminOrCreatedBy,
  },
};
