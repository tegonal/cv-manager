'use client'
import { useLocale, useRowLabel } from '@payloadcms/ui'
import ky from 'ky'
import React, { useMemo, useState } from 'react'

import { SkillGroup } from '@/types/payload-types'

export const RowLabelSkillGroup: React.FC = () => {
  const { data } = useRowLabel<any>()
  const locale = useLocale()
  const [skillGroup, setSkillGroup] = useState<SkillGroup>()

  const label = useMemo(() => {
    const fetchSkill = async (id: string) => {
      if (!id) {
        return
      }
      try {
        ky.get<SkillGroup>(`/api/skillGroup/${id}?locale=${locale.code}`)
          .json()
          .then((data) => setSkillGroup(data))
      } catch (error) {
        console.error(error)
      }
    }

    const groupId = data?.group
    if (!skillGroup || (groupId && skillGroup.id !== groupId)) {
      fetchSkill(groupId)
    }
    return skillGroup?.name
  }, [data, skillGroup, locale.code])

  return (
    <div>
      <span>{label}</span>
    </div>
  )
}
