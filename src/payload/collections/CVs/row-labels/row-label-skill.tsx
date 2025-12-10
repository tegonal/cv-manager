'use client'
import { useLocale, useRowLabel } from '@payloadcms/ui'
import { TypedLocale } from 'payload'
import React, { useEffect, useState } from 'react'

import { getSkill, getSkillGroup } from './actions'
import { SkillOrSkillGroup, SkillRowData } from './types'

const skillFields = ['skill', 'language', 'softSkill', 'name'] as const

export const RowLabelSkill: React.FC = () => {
  const { data } = useRowLabel<SkillRowData>()
  const locale = useLocale()
  const [skill, setSkill] = useState<SkillOrSkillGroup>()

  const skillField = skillFields.find((field) => data?.[field])
  const isNameField = skillField === 'name'
  const skillRelation = !isNameField && skillField ? data?.[skillField] : null
  const skillType = skillRelation && 'relationTo' in skillRelation ? skillRelation.relationTo : null
  const skillId = skillRelation && 'value' in skillRelation ? skillRelation.value : null

  useEffect(() => {
    if (isNameField || !skillId || !skillType) return

    const fetchData = async () => {
      if (skillType === 'skill') {
        const result = await getSkill(skillId, locale.code as TypedLocale)
        if (result) setSkill({ ...result, type: 'skill' })
      } else if (skillType === 'skillGroup') {
        const result = await getSkillGroup(skillId, locale.code as TypedLocale)
        if (result) setSkill({ ...result, type: 'skillGroup' })
      }
    }

    if (!skill || String(skill.id) !== skillId || skill.type !== skillType) {
      fetchData()
    }
  }, [skillId, skillType, locale.code, isNameField, skill])

  const label = isNameField ? data?.name : skill?.name

  return (
    <div>
      <span>{label}</span>
    </div>
  )
}
