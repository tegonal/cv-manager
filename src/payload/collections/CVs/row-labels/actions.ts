'use server'

import { TypedLocale } from 'payload'

import { getAuthenticatedPayload } from '@/payload/utilities/get-authenticated-payload'
import { Lang, Skill, SkillGroup } from '@/types/payload-types'

// Not exported: every export of a 'use server' file can be called from the browser, and this
// would read any of these collections by id
const findRelation = async <TSlug extends 'langs' | 'skill' | 'skillGroup'>(
  collection: TSlug,
  id: string,
  locale: TypedLocale,
  description: string,
) => {
  if (!id) return null

  const { payload, user } = await getAuthenticatedPayload()

  try {
    return await payload.findByID({
      collection,
      id,
      locale,
      overrideAccess: false,
      user,
    })
  } catch (error) {
    payload.logger.error({ error, id, locale }, `Failed to fetch ${description}`)
    return null
  }
}

export async function getLanguage(id: string, locale: TypedLocale): Promise<Lang | null> {
  return findRelation('langs', id, locale, 'language')
}

export async function getSkill(id: string, locale: TypedLocale): Promise<null | Skill> {
  return findRelation('skill', id, locale, 'skill')
}

export async function getSkillGroup(id: string, locale: TypedLocale): Promise<null | SkillGroup> {
  return findRelation('skillGroup', id, locale, 'skill group')
}
