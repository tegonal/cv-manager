'use client'
import { useRowLabel } from '@payloadcms/ui'
import React from 'react'

const excludeKeys = ['id', 'year', 'fromYear', 'toYear', 'locale', 'organisation', 'level']

export const RowLabelFirstText: React.FC = () => {
  const { data, rowNumber } = useRowLabel<any>()

  const firstTextKey = data
    ? Object.keys(data).find((key) => typeof data[key] === 'string' && !excludeKeys.includes(key))
    : undefined
  const firstText: string | undefined = firstTextKey ? data[firstTextKey] : undefined
  const label = firstText
    ? firstText.length > 50
      ? firstText.slice(0, 47) + '...'
      : firstText
    : `Item ${rowNumber}`

  return (
    <div>
      <span>{label}</span>
    </div>
  )
}
