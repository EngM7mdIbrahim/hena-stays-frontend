import { useEffect, useMemo, useState } from 'react'
import { GetAllProjectsQuery, Project } from '@commonTypes'
import { defaultLimitOptions, getDefaultSortOptions } from '@constants'
import { useTranslations } from 'next-intl'

import { useGetProjects } from '@hooks/query/projects/useGetProjects'
import { useUpdateSearchParams } from '@hooks/useUpdateSearchParams'

export type UseProjectsListProps = Pick<GetAllProjectsQuery, 'mine'> &
  Partial<Pick<Project, 'status' | 'recommended'>> & {
    owner?: string
  }

export function useProjectsList({
  mine,
  status,
  recommended,
  owner
}: UseProjectsListProps = {}) {
  const t = useTranslations()
  const [filters, setFilters] = useState<
    Pick<GetAllProjectsQuery, 'filter' | 'text' | 'page'>
  >({})
  const [sort, setSort] = useState<GetAllProjectsQuery['sort'] | null>(
    JSON.parse(getDefaultSortOptions(t)[0].value)
  )
  const [limit, setLimit] = useState<Required<GetAllProjectsQuery>['limit']>(
    defaultLimitOptions[0].value
  )

  const { updateSearchParams } = useUpdateSearchParams({
    onFiltersChange: setFilters,
    scroll: true
  })

  useEffect(() => {
    updateSearchParams(filters)
  }, [filters, updateSearchParams])

  const { data, isLoading, isError, error } = useGetProjects({
    limit,
    showFields: {
      owner: true
    },
    text: filters.text,
    page: filters.page,
    filter: {
      ...filters.filter,

      ...(owner ? { owner } : {}),
      ...(status ? { status } : {}),
      ...(recommended ? { recommended: String(recommended) } : {})
    },
    ...(sort ? { sort } : {}),
    ...(mine ? { mine } : {})
  })

  const projects = useMemo(() => {
    return (data ?? { items: [] }).items
  }, [data])

  return {
    projects,
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
