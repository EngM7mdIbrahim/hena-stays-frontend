import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { GetAllInteractionsQuery } from '@commonTypes'
import { SEARCH_PARAM_KEYS } from '@constants'

import { useGetInteractions } from '@hooks/query'

export function useInteractionsList() {
  const searchParams = useSearchParams()

  const userId = searchParams.get(SEARCH_PARAM_KEYS.USER_KEY)

  const [page, setPage] =
    useState<Required<GetAllInteractionsQuery>['page']>('1')

  const { data, isLoading, isError, error } = useGetInteractions({
    showFields: {
      property: true
    },
    page,
    filter: {
      ...(userId && { _id: userId })
    }
  })

  const interactions = useMemo(() => {
    return (data ?? { items: [] }).items
  }, [data])

  return {
    interactions,
    data,
    page,
    setPage,
    isLoading,
    isError,
    error
  }
}
