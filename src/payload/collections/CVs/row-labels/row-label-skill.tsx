'use client'
import { useLocale, useRowLabel } from '@payloadcms/ui'
import ky from 'ky'
import React, { useMemo, useState } from 'react'

import { Skill, SkillGroup } from '@/types/payload-types'

const skillFields = ['skill', 'language', 'softSkill', 'name']

type SkillOrSkillGroup = (Skill | SkillGroup) & { type: 'skill' | 'skillGroup' }

export const RowLabelSkill: React.FC = (args) => {
  const { data } = useRowLabel<any>()
  const locale = useLocale()
  const [skill, setSkill] = useState<SkillOrSkillGroup>()

  const label = useMemo(() => {
    const fetchSkill = async (id: string) => {
      if (!id) {
        return
      }
      try {
        ky.get<Skill>(`/api/skill/${id}?locale=${locale.code}`)
          .json()
          .then((data) => setSkill({ ...data, type: 'skill' }))
      } catch (error) {
        console.error(error)
      }
    }

    const fetchSkillGroup = async (id: string) => {
      if (!id) {
        return
      }
      try {
        ky.get<Skill>(`/api/skillGroup/${id}?locale=${locale.code}`)
          .json()
          .then((data) => setSkill({ ...data, type: 'skillGroup' }))
      } catch (error) {
        console.error(error)
      }
    }

    const skillField = skillFields.find((field) => data?.[field])
    if (!skillField) {
      return ''
    }
    if (skillField === 'name') {
      return data?.[skillField]
    }
    const skillRelation = data?.[skillField]
    const skillType = skillRelation.relationTo
    const skillId = skillRelation.value

    if (!skill || (skillId && skill.id !== skillId && skill.type !== skillType)) {
      switch (skillType) {
        case 'skill':
          fetchSkill(skillId)
          break
        case 'skillGroup':
          fetchSkillGroup(skillId)
          break
      }
    }
    return skill?.name
  }, [data, skill, locale.code])

  return (
    <div>
      <span>{label}</span>
    </div>
  )
}
