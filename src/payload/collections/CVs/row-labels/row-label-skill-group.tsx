'use client'
import { useRowLabel } from '@payloadcms/ui'
import React from 'react'

import { getSkillGroup } from './actions'
import { SkillGroupRowData } from './types'
import { useFetchedRelation } from './use-fetched-relation'

export const RowLabelSkillGroup: React.FC = () => {
  const { data } = useRowLabel<SkillGroupRowData>()
  const { data: skillGroup } = useFetchedRelation(data?.group, getSkillGroup)

  return (
    <div>
      <span>{skillGroup?.name}</span>
    </div>
  )
}
