import { Field } from 'payload';
import { I18nCollection } from '@/lib/i18nCollection';

export const selectTechSkillLevel: Field = {
  name: 'level',
  type: 'relationship',
  label: I18nCollection.fieldLabel.skillLevel,
  relationTo: 'level',
  required: true,
  filterOptions: () => {
    return {
      levelType: { equals: 'skill' },
    };
  },
  admin: {
    sortOptions: 'points',
    allowEdit: false,
    width: '50%',
  },
};
