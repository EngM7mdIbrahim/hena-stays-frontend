import { useEffect, useMemo, useState } from 'react'
import { FindAllContactUsRequestQuery } from '@commonTypes'
import { defaultLimitOptions } from '@constants'

import { useGetContactUs } from '@hooks/query/contact-us/useGetContactUs'
import { useUpdateSearchParams } from '@hooks/useUpdateSearchParams'

export function useContactUsList() {
  const [filters, setFilters] = useState<
    Pick<FindAllContactUsRequestQuery, 'text' | 'page'>
  >({})
  const [sort, setSort] = useState<FindAllContactUsRequestQuery['sort'] | null>(
    null
  )
  const [limit, setLimit] = useState<
    Required<FindAllContactUsRequestQuery>['limit']
  >(defaultLimitOptions[0].value)

  const { updateSearchParams } = useUpdateSearchParams({
    onFiltersChange: setFilters,
    scroll: true
  })

  useEffect(() => {
    updateSearchParams(filters)
  }, [filters, updateSearchParams])

  const { data, isLoading, isError, error } = useGetContactUs({
    limit,
    page: filters.page,
    text: filters.text,
    ...(sort ? { sort } : {})
  })

  const contactUsRequests = useMemo(() => {
    return (data ?? { items: [] }).items
  }, [data])

  return {
    contactUsRequests,
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
