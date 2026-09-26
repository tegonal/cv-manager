'use client'
import { useLocale } from '@payloadcms/ui'
import { TypedLocale } from 'payload'
import { useEffect, useState } from 'react'

type FetchAction<T> = (id: string, locale: TypedLocale) => Promise<null | T>

type Fetched<T> = {
  data: null | T
  fetchAction: FetchAction<T>
  id: number | string
  locale: string
}

type UseFetchedRelationResult<T> = {
  data: T | undefined
  isLoading: boolean
}

/**
 * Custom hook for fetching related data in row labels using server actions.
 * Fetches once per relation id, locale and fetch action.
 */
export function useFetchedRelation<T>(
  id: null | number | string | undefined,
  fetchAction: FetchAction<T>,
): UseFetchedRelationResult<T> {
  const locale = useLocale()
  const [fetched, setFetched] = useState<Fetched<T>>()

  const hasId = id !== undefined && id !== null && id !== ''
  const isCurrent =
    hasId &&
    fetched?.id === id &&
    fetched.locale === locale.code &&
    fetched.fetchAction === fetchAction

  useEffect(() => {
    if (!hasId || isCurrent) return

    let cancelled = false
    const record = (data: null | T) => {
      if (!cancelled) setFetched({ data, fetchAction, id, locale: locale.code })
    }
    fetchAction(String(id), locale.code as TypedLocale).then(record, () => record(null))

    return () => {
      cancelled = true
    }
  }, [hasId, isCurrent, id, locale.code, fetchAction])

  return {
    data: isCurrent ? (fetched.data ?? undefined) : undefined,
    isLoading: hasId && !isCurrent,
  }
}
