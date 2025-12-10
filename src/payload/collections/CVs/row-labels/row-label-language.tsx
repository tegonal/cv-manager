'use client'
import { useRowLabel } from '@payloadcms/ui'
import React from 'react'

import { getLanguage } from './actions'
import { LanguageRowData } from './types'
import { useFetchedRelation } from './use-fetched-relation'

export const RowLabelLanguage: React.FC = () => {
  const { data } = useRowLabel<LanguageRowData>()
  const { data: language } = useFetchedRelation(data?.language, getLanguage)

  return (
    <div>
      <span>{language?.name}</span>
    </div>
  )
}
