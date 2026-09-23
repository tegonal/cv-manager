'use client'
import type { TextFieldClientComponent } from 'payload'

import { getTranslation } from '@payloadcms/translations'
import { TextInput, useField, useTranslation, withCondition } from '@payloadcms/ui'
import React from 'react'

import { toSixDigitHex } from './hex-color'
import './color-field.scss'

// Hex validation runs server-side via the field's `validate` (see ./index.ts)
const ColorFieldComponent: TextFieldClientComponent = ({
  field: { admin: { className, description, placeholder } = {}, label, localized, required },
  path: pathFromProps,
  readOnly,
}) => {
  const { i18n } = useTranslation()

  const {
    customComponents: { AfterInput, BeforeInput, Description, Error, Label } = {},
    disabled,
    path,
    setValue,
    showError,
    value,
  } = useField<string>({ potentiallyStalePath: pathFromProps })

  const isReadOnly = readOnly || disabled

  return (
    <TextInput
      AfterInput={
        <>
          <input
            aria-label={getTranslation(label || path, i18n)}
            className="color-field__swatch"
            disabled={isReadOnly}
            onChange={(e) => setValue(e.target.value)}
            type="color"
            value={toSixDigitHex(value)}
          />
          {AfterInput}
        </>
      }
      BeforeInput={BeforeInput}
      className={['color-field', className].filter(Boolean).join(' ')}
      Description={Description}
      description={description}
      Error={Error}
      Label={Label}
      label={label}
      localized={localized}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      path={path}
      placeholder={placeholder}
      readOnly={isReadOnly}
      required={required}
      showError={showError}
      value={value || ''}
    />
  )
}

export const ColorField = withCondition(ColorFieldComponent)
