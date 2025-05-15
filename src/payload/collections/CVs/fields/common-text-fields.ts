import { Field } from 'payload'
import { I18nCollection } from '@/lib/i18nCollection'

export const textNameRequired: Field = {
  name: 'name',
  label: I18nCollection.fieldLabel.name,
  type: 'text',
  required: true,
  localized: true,
}

export const textName: Field = {
  name: 'name',
  label: I18nCollection.fieldLabel.name,
  type: 'text',
  localized: true,
}

export const textDescriptionRequired: Field = {
  name: 'description',
  label: I18nCollection.fieldLabel.description,
  type: 'textarea',
  required: true,
  localized: true,
}

export const textDescription: Field = {
  name: 'description',
  label: I18nCollection.fieldLabel.description,
  type: 'richText',
  localized: true,
}

export const textLinkOptional: Field = {
  type: 'text',
  name: 'link',
  localized: false,
  required: false,
  label: I18nCollection.fieldLabel.link,
}
