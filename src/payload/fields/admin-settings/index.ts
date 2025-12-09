import type { Field } from 'payload'

import { createdByField } from '@/payload/fields/created-by'
import { organisationField } from '@/payload/fields/organisation'
import { updatedByField } from '@/payload/fields/updated-by'

type Props = {
  sidebar?: boolean
}

export const adminSettingsField = ({ sidebar }: Props = {}): Field => ({
  admin: {
    ...(sidebar && { position: 'sidebar' }),
  },
  fields: [organisationField, createdByField, updatedByField],
  type: 'row',
})
