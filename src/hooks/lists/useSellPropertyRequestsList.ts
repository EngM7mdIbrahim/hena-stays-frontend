import { useEffect, useMemo, useState } from 'react'
import { GetAllRequestSellPropertyQuery } from '@commonTypes'
import { defaultLimitOptions, propertySortOptions } from '@constants'
import { useTranslations } from 'next-intl'

import {
  useGetSellPropertyRequests,
  UseGetSellPropertyRequestsOptions
} from '@hooks/query/sell-property-requests/useGetSellPropertyRequests'
import { useUpdateSearchParams } from '@hooks/useUpdateSearchParams'

export type UseSellPropertyRequestsListProps = Pick<
  GetAllRequestSellPropertyQuery,
  'mine' | 'limit' | 'sort'
> &
  Pick<UseGetSellPropertyRequestsOptions, 'enabled'>

export function useSellPropertyRequestsList({
  mine,
  enabled
}: UseSellPropertyRequestsListProps = {}) {
  const t = useTranslations()
  const [filters, setFilters] = useState<
    Pick<GetAllRequestSellPropertyQuery, 'filter' | 'text' | 'page'>
  >({})
  const [sort, setSort] = useState<
    GetAllRequestSellPropertyQuery['sort'] | null
  >(JSON.parse(propertySortOptions(t)[0].value))
  const [limit, setLimit] = useState<
    Required<GetAllRequestSellPropertyQuery>['limit']
  >(defaultLimitOptions[0].value)

  const { updateSearchParams } = useUpdateSearchParams({
    onFiltersChange: setFilters,
    scroll: true
  })

  // Update URL whenever filters change
  useEffect(() => {
    updateSearchParams(filters)
  }, [filters, updateSearchParams])

  const { data, isLoading, isError, error } = useGetSellPropertyRequests(
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

  const sellPropertyRequests = useMemo(() => {
    return (data ?? { items: [] }).items
  }, [data])

  return {
    sellPropertyRequests,
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
