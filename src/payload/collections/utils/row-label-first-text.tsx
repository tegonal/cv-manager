'use client'
import { useRowLabel, useTranslation } from '@payloadcms/ui'
import React from 'react'

const excludeKeys = ['id', 'year', 'fromYear', 'toYear', 'locale', 'organisation', 'level']
const maxLength = 50

const truncate = (text: string) =>
  text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text

export const RowLabelFirstText: React.FC = () => {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>()
  const { t } = useTranslation()

  const firstText = Object.entries(data ?? {}).find(
    (entry): entry is [string, string] =>
      typeof entry[1] === 'string' && !excludeKeys.includes(entry[0]),
  )?.[1]
  // rowNumber is the 0-based row index, numbered like Payload's own row labels
  const label = firstText
    ? truncate(firstText)
    : `${t('general:item')} ${String((rowNumber ?? 0) + 1).padStart(2, '0')}`

  return (
    <div>
      <span>{label}</span>
    </div>
  )
}
