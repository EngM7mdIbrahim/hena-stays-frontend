import { useEffect, useMemo, useState } from 'react'
import { GetAllUsersRequestQuery, UserRoleType } from '@commonTypes'
import { defaultLimitOptions, getDefaultSortOptions } from '@constants'
import { useTranslations } from 'next-intl'

import { useGetUsersAsAdmin } from '@hooks/query/users/admin/useGetUsersAsAdmin'
import { useUpdateSearchParams } from '@hooks/useUpdateSearchParams'

export interface UseUsersList {
  role?: UserRoleType
}

export function useUsersList({ role }: UseUsersList = {}) {
  const t = useTranslations()
  const [sort, setSort] = useState<GetAllUsersRequestQuery['sort'] | null>(
    JSON.parse(getDefaultSortOptions(t)[0].value)
  )
  const [limit, setLimit] = useState<
    Required<GetAllUsersRequestQuery>['limit']
  >(defaultLimitOptions[0].value)

  const [filters, setFilters] = useState<
    Pick<GetAllUsersRequestQuery, 'text' | 'page'>
  >({})

  const { updateSearchParams } = useUpdateSearchParams({
    onFiltersChange: setFilters,
    scroll: true
  })

  // Update URL whenever filters change
  useEffect(() => {
    updateSearchParams(filters)
  }, [filters, updateSearchParams])

  const { data, isLoading, isError, error } = useGetUsersAsAdmin({
    limit,
    page: filters.page,
    text: filters.text,

    ...(role ? { filter: { role } } : {}),
    ...(sort ? { sort } : {})
  })
  const users = useMemo(() => {
    return (data ?? { items: [] }).items
  }, [data])

  return {
    users,
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
