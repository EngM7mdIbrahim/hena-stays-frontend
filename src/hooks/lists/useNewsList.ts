import { useEffect, useMemo, useState } from 'react'
import { FindAllNewsRequestQuery } from '@commonTypes'
import { defaultLimitOptions } from '@constants'

import { useGetNews } from '@hooks/query/news/useGetNews'
import { useUpdateSearchParams } from '@hooks/useUpdateSearchParams'

export function useNewsList(
  limit?: Required<FindAllNewsRequestQuery>['limit']
) {
  const [filters, setFilters] = useState<Pick<FindAllNewsRequestQuery, 'page'>>(
    {}
  )

  const { updateSearchParams } = useUpdateSearchParams({
    onFiltersChange: setFilters,
    scroll: true
  })

  // Update URL whenever filters change
  useEffect(() => {
    updateSearchParams(filters)
  }, [filters, updateSearchParams])

  const { data, isLoading, isError, error } = useGetNews({
    limit: limit || defaultLimitOptions[0].value,
    page: filters.page
  })

  const news = useMemo(() => {
    return (data ?? { items: [] }).items
  }, [data])

  return {
    news,
    data,
    isLoading,
    isError,
    error,
    filters,
    setFilters
  }
}
