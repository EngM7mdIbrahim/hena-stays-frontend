import { useMemo, useState } from 'react'
import { GetAllUsersRequestQuery, UserRoleType } from '@commonTypes'
import { defaultLimitOptions, getDefaultSortOptions } from '@constants'
import { useTranslations } from 'next-intl'

import { useGetUsersAsCompany } from '@hooks/query/users/company/useGetUsersAsCompany'

export interface UseEmployeesList {
  role: UserRoleType
}

export function useEmployeesList({ role }: UseEmployeesList) {
  const t = useTranslations()
  const [sort, setSort] = useState<GetAllUsersRequestQuery['sort'] | null>(
    JSON.parse(getDefaultSortOptions(t)[0].value)
  )
  const [limit, setLimit] = useState<
    Required<GetAllUsersRequestQuery>['limit']
  >(defaultLimitOptions[0].value)

  const [page, setPage] =
    useState<Required<GetAllUsersRequestQuery>['page']>('1')

  const { data, isLoading, isError, error } = useGetUsersAsCompany({
    limit,
    page,
    filter: {
      role
    },
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
    page,
    setPage
  }
}
