'use client'
import { useLocale } from '@payloadcms/ui'
import { TypedLocale } from 'payload'
import { useEffect, useState } from 'react'

type FetchAction<T> = (id: string, locale: TypedLocale) => Promise<null | T>

type UseFetchedRelationResult<T> = {
  data: T | undefined
  isLoading: boolean
}

/**
 * Custom hook for fetching related data in row labels using server actions.
 * Handles caching to prevent unnecessary refetches when the ID hasn't changed.
 */
export function useFetchedRelation<T extends { id: number | string }>(
  id: string | undefined,
  fetchAction: FetchAction<T>,
): UseFetchedRelationResult<T> {
  const locale = useLocale()
  const [data, setData] = useState<T>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!id) return

    // Skip if we already have the data for this ID
    if (data?.id === id) return

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const result = await fetchAction(id, locale.code as TypedLocale)
        if (result) setData(result)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id, locale.code, data?.id, fetchAction])

  return { data, isLoading }
}
