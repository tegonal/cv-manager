import { getIdFromRelation } from '@/payload/utilities/getIdFromRelation'
import { User, UserOrganisations } from '@/types/payload-types'

type NonEmptyArray<T> = T extends (infer U)[] ? (U[] extends [] ? never : T) : never

type NonEmptyUserOrganisations = NonEmptyArray<UserOrganisations>

type Roles = NonEmptyUserOrganisations[0]['roles']

export const checkOrganisationRoles = (
  allRoles: Roles = [],
  user: null | User,
  organisationId: number,
): boolean => {
  if (organisationId) {
    if (
      allRoles?.some((role) => {
        return user?.organisations?.some(({ organisation: userOrganisation, roles }) => {
          const organisationID = getIdFromRelation(userOrganisation)
          return organisationID === organisationId && roles?.includes(role)
        })
      })
    )
      return true
  }

  return false
}
