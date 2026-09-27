'use client'
import { useRowLabel } from '@payloadcms/ui'
import React from 'react'

import { getSkill, getSkillGroup } from './actions'
import { SkillRowData } from './types'
import { useFetchedRelation } from './use-fetched-relation'

// Rows reference a skill or skill group, or name the skill directly (other skills)
export const RowLabelSkill: React.FC = () => {
  const { data } = useRowLabel<SkillRowData>()
  const relation = data?.skill
  const skill = useFetchedRelation(
    relation?.value,
    relation?.relationTo === 'skillGroup' ? getSkillGroup : getSkill,
  )

  return (
    <div>
      <span>{relation ? skill?.name : data?.name}</span>
    </div>
  )
}
