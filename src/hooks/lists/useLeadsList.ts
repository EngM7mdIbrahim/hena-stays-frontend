import { useEffect, useMemo, useState } from 'react'
import { GetAllLeadsQuery, Leads } from '@commonTypes'
import { defaultLimitOptions } from '@constants'

import { useGetLeads } from '@hooks/query/leads/useGetLeads'
import { useUpdateSearchParams } from '@hooks/useUpdateSearchParams'

export type UseLeadsListProps = Partial<Pick<Leads, 'status'>>

export function useLeadsList({ status }: UseLeadsListProps = {}) {
  const [filters, setFilters] = useState<
    Pick<GetAllLeadsQuery, 'filter' | 'text' | 'page'>
  >({})
  const [sort, setSort] = useState<GetAllLeadsQuery['sort'] | null>(null)
  const [limit, setLimit] = useState<Required<GetAllLeadsQuery>['limit']>(
    defaultLimitOptions[0].value
  )

  const [page, setPage] = useState<Required<GetAllLeadsQuery>['page']>('1')

  const { updateSearchParams } = useUpdateSearchParams({
    onFiltersChange: setFilters,
    scroll: true
  })

  const [selectedLeads, setSelectedLeads] = useState<Leads[]>([])

  useEffect(() => {
    updateSearchParams(filters)
    setSelectedLeads([])
  }, [filters, updateSearchParams])

  const { data, isLoading, isError, error } = useGetLeads({
    showFields: {
      property: {
        createdBy: true
      },
      user: true
    },
    limit,
    page: filters.page || page,
    text: filters.text,
    filter: {
      ...filters.filter,
      ...(status ? { status } : {})
    },
    ...(sort ? { sort } : {})
  })

  const leads = useMemo(() => {
    return (data ?? { items: [] }).items
  }, [data])

  return {
    leads,
    selectedLeads,
    setSelectedLeads,
    data,
    isLoading,
    isError,
    error,
    sort,
    setSort,
    limit,
    setLimit,
    page,
    setPage,
    filters,
    setFilters
  }
}
