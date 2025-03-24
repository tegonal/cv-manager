import type { Field } from 'payload'
import { organisationField } from '@/payload/fields/organisation'
import { createdByField } from '@/payload/fields/created-by'
import { updatedByField } from '@/payload/fields/updated-by'

type Props = {
  sidebar?: boolean
}

export const adminSettingsField = ({ sidebar }: Props = {}): Field => ({
  type: 'row',
  fields: [organisationField, createdByField, updatedByField],
  admin: {
    ...(sidebar && { position: 'sidebar' }),
  },
})
