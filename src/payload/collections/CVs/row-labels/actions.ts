'use server'

import { TypedLocale } from 'payload'

import { getAuthenticatedPayload } from '@/payload/utilities/get-authenticated-payload'
import { Lang, Skill, SkillGroup } from '@/types/payload-types'

export async function getLanguage(id: string, locale: TypedLocale): Promise<Lang | null> {
  if (!id) return null

  const { payload, user } = await getAuthenticatedPayload()

  try {
    return await payload.findByID({
      collection: 'langs',
      id,
      locale,
      overrideAccess: false,
      user,
    })
  } catch (error) {
    payload.logger.error({ error, id, locale }, 'Failed to fetch language')
    return null
  }
}

export async function getSkill(id: string, locale: TypedLocale): Promise<null | Skill> {
  if (!id) return null

  const { payload, user } = await getAuthenticatedPayload()

  try {
    return await payload.findByID({
      collection: 'skill',
      id,
      locale,
      overrideAccess: false,
      user,
    })
  } catch (error) {
    payload.logger.error({ error, id, locale }, 'Failed to fetch skill')
    return null
  }
}

export async function getSkillGroup(id: string, locale: TypedLocale): Promise<null | SkillGroup> {
  if (!id) return null

  const { payload, user } = await getAuthenticatedPayload()

  try {
    return await payload.findByID({
      collection: 'skillGroup',
      id,
      locale,
      overrideAccess: false,
      user,
    })
  } catch (error) {
    payload.logger.error({ error, id, locale }, 'Failed to fetch skill group')
    return null
  }
}
