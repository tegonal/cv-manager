import { Lang, Skill, SkillGroup } from '@/types/payload-types'

export type LanguageRowData = {
  language?: string
}

// Named entity type for items with an id and name
export type NamedEntity = Lang | Skill | SkillGroup

// Row label data types based on CV collection field structure
export type SkillGroupRowData = {
  group?: string
}

export type SkillOrSkillGroup = (Skill | SkillGroup) & { type: 'skill' | 'skillGroup' }

export type SkillRowData = {
  language?: {
    relationTo: 'skill' | 'skillGroup'
    value: string
  }
  name?: string
  skill?: {
    relationTo: 'skill' | 'skillGroup'
    value: string
  }
  softSkill?: {
    relationTo: 'skill' | 'skillGroup'
    value: string
  }
}
