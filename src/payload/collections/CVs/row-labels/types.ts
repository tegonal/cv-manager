export type LanguageRowData = {
  language?: RelationId
}

export type SkillGroupRowData = {
  group?: RelationId
}

export type SkillRowData = {
  name?: string
  skill?: {
    relationTo: 'skill' | 'skillGroup'
    value: RelationId
  }
}

// Relation values are the ids of the related documents (numbers with Postgres)
type RelationId = number | string
