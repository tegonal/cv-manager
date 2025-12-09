import { Field } from 'payload'

import { I18nCollection } from '@/lib/i18n-collection'

export const textNameRequired: Field = {
  label: I18nCollection.fieldLabel.name,
  localized: true,
  name: 'name',
  required: true,
  type: 'text',
}

export const textName: Field = {
  label: I18nCollection.fieldLabel.name,
  localized: true,
  name: 'name',
  type: 'text',
}

export const textDescriptionRequired: Field = {
  label: I18nCollection.fieldLabel.description,
  localized: true,
  name: 'description',
  required: true,
  type: 'textarea',
}

export const textDescription: Field = {
  label: I18nCollection.fieldLabel.description,
  localized: true,
  name: 'description',
  type: 'richText',
}

export const textLinkOptional: Field = {
  label: I18nCollection.fieldLabel.link,
  localized: false,
  name: 'link',
  required: false,
  type: 'text',
}
