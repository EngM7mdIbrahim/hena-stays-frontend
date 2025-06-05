import { useEffect, useMemo, useState } from 'react'
import {
  CreditRequestStatusType,
  GetAllCreditRequestsQuery
} from '@commonTypes'
import { defaultLimitOptions, getDefaultSortOptions } from '@constants'
import { useTranslations } from 'next-intl'

import { useGetAllCreditsRequests } from '@hooks/query/payments'
import { useUpdateSearchParams } from '@hooks/useUpdateSearchParams'

export interface UseCreditsRequestsListProps {
  status?: CreditRequestStatusType
}

export function useCreditsRequestsList({
  status
}: UseCreditsRequestsListProps = {}) {
  const t = useTranslations()
  const [filters, setFilters] = useState<
    Pick<GetAllCreditRequestsQuery, 'page' | 'text'>
  >({})
  const [sort, setSort] = useState<GetAllCreditRequestsQuery['sort'] | null>(
    JSON.parse(getDefaultSortOptions(t)[0].value)
  )
  const [limit, setLimit] = useState<
    Required<GetAllCreditRequestsQuery>['limit']
  >(defaultLimitOptions[0].value)

  const { updateSearchParams } = useUpdateSearchParams({
    onFiltersChange: setFilters,
    scroll: true
  })

  // Update URL whenever filters change
  useEffect(() => {
    updateSearchParams(filters)
  }, [filters, updateSearchParams])

  const { data, isLoading, isError, error, isFetching } =
    useGetAllCreditsRequests({
      showFields: {
        user: true
      },
      limit,
      page: filters.page,
      text: filters.text,
      filter: {
        status
      },
      ...(sort ? { sort } : {})
    })

  const creditsRequests = useMemo(() => {
    return (data ?? { items: [] }).items
  }, [data])

  return {
    creditsRequests,
    data,
    isLoading,
    isError,
    isFetching,
    error,
    limit,
    setLimit,
    sort,
    setSort,
    filters,
    setFilters
  }
}
