import { useEffect, useMemo, useState } from 'react'
import { CallRequest, GetAllCallRequestsQuery } from '@commonTypes'
import { defaultLimitOptions } from '@constants'

import { useGetCallRequests } from '@hooks/query/call-requests/useGetCallRequests'
import { useUpdateSearchParams } from '@hooks/useUpdateSearchParams'

export type UseCallRequestsListProps = Partial<Pick<CallRequest, 'status'>>

export function useCallRequestsList({ status }: UseCallRequestsListProps = {}) {
  const [filters, setFilters] = useState<
    Pick<GetAllCallRequestsQuery, 'filter' | 'text' | 'page'>
  >({})
  const [sort, setSort] = useState<GetAllCallRequestsQuery['sort'] | null>(null)
  const [limit, setLimit] = useState<
    Required<GetAllCallRequestsQuery>['limit']
  >(defaultLimitOptions[0].value)

  const { updateSearchParams } = useUpdateSearchParams({
    onFiltersChange: setFilters,
    scroll: true
  })

  useEffect(() => {
    updateSearchParams(filters)
  }, [filters, updateSearchParams])

  const { data, isLoading, isError, error } = useGetCallRequests({
    limit,
    page: filters.page,
    text: filters.text,
    filter: {
      ...filters.filter,
      ...(status ? { status } : {})
    },
    ...(sort ? { sort } : {})
  })

  const callRequests = useMemo(() => {
    return (data ?? { items: [] }).items
  }, [data])

  return {
    callRequests,
    data,
    isLoading,
    isError,
    error,
    sort,
    setSort,
    limit,
    setLimit,

    filters,
    setFilters
  }
}
