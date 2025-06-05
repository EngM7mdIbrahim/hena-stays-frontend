import { useEffect, useMemo, useState } from 'react'
import { GetAllRequestBuyPropertyQuery } from '@commonTypes'
import { defaultLimitOptions, propertySortOptions } from '@constants'
import { useTranslations } from 'next-intl'

import {
  useGetBuyPropertyRequests,
  UseGetBuyPropertyRequestsOptions
} from '@hooks/query/buy-property-requests/useGetBuyPropertyRequests'
import { useUpdateSearchParams } from '@hooks/useUpdateSearchParams'

export type UseBuyPropertyRequestsListProps = Pick<
  GetAllRequestBuyPropertyQuery,
  'mine' | 'limit' | 'sort'
> &
  Pick<UseGetBuyPropertyRequestsOptions, 'enabled'>

export function useBuyPropertyRequestsList({
  mine,
  enabled
}: UseBuyPropertyRequestsListProps = {}) {
  const t = useTranslations()
  const [filters, setFilters] = useState<
    Pick<GetAllRequestBuyPropertyQuery, 'filter' | 'text' | 'page'>
  >({})
  const [sort, setSort] = useState<
    GetAllRequestBuyPropertyQuery['sort'] | null
  >(JSON.parse(propertySortOptions(t)[0].value))
  const [limit, setLimit] = useState<
    Required<GetAllRequestBuyPropertyQuery>['limit']
  >(defaultLimitOptions[0].value)

  const { updateSearchParams } = useUpdateSearchParams({
    onFiltersChange: setFilters,
    scroll: true
  })

  // Update URL whenever filters change
  useEffect(() => {
    updateSearchParams(filters)
  }, [filters, updateSearchParams])

  const { data, isLoading, isError, error } = useGetBuyPropertyRequests(
    {
      limit,
      showFields: {
        subCategory: {
          name: true
        },
        category: true,
        createdBy: true,
        amenities: {
          basic: true
        }
      },
      text: filters.text,
      page: filters.page,
      filter: {
        ...filters.filter
      },
      ...(sort ? { sort } : {}),
      ...(mine ? { mine } : {})
    },
    {
      enabled
    }
  )

  const buyPropertyRequests = useMemo(() => {
    return (data ?? { items: [] }).items
  }, [data])

  return {
    buyPropertyRequests,
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
