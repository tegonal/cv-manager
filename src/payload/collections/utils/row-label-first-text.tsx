'use client'
import { useRowLabel, useTranslation } from '@payloadcms/ui'
import React from 'react'

const excludeKeys = ['id', 'year', 'fromYear', 'toYear', 'locale', 'organisation', 'level']

export const RowLabelFirstText: React.FC = () => {
  const { data, rowNumber } = useRowLabel<any>()
  const { t } = useTranslation()

  const firstTextKey = data
    ? Object.keys(data).find((key) => typeof data[key] === 'string' && !excludeKeys.includes(key))
    : undefined
  const firstText: string | undefined = firstTextKey ? data[firstTextKey] : undefined
  // rowNumber is the 0-based row index, numbered like Payload's own row labels
  const label = firstText
    ? firstText.length > 50
      ? firstText.slice(0, 47) + '...'
      : firstText
    : `${t('general:item')} ${String((rowNumber ?? 0) + 1).padStart(2, '0')}`

  return (
    <div>
      <span>{label}</span>
    </div>
  )
}
