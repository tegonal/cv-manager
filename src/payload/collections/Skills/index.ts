import { CollectionConfig } from 'payload';
import { adminSettingsField } from '@/payload/fields/admin-settings';
import { organisationsAccess } from '@/payload/collections/access/organisationsAccess';
import { loggedInAccess } from '@/payload/collections/access/loggedInAccess';
import { organisationAdminsAccess } from '@/payload/collections/access/organisationAdminsAccess';
import { I18nCollection } from '@/lib/i18nCollection';
import { selectSkillGroup } from '@/payload/collections/Skills/fields/select-skill-group';

export const Skills: CollectionConfig = {
  slug: 'skill',
  access: {
    read: organisationsAccess,
    create: loggedInAccess,
    update: organisationAdminsAccess,
    delete: organisationAdminsAccess,
  },
  admin: {
    group: I18nCollection.collectionGroup.settings,
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      localized: true,
    },
    {
      type: 'richText',
      name: 'description',
      localized: true,
    },
    adminSettingsField({ sidebar: true }),
  ],
};
