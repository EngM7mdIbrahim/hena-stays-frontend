import { useMemo, useState } from 'react'
import { GetAllUsersRequestQuery } from '@commonTypes'

import { useGetFollows } from '@hooks/query/community/follows/useGetFollows'
import { useGetUserPermissions } from '@hooks/useGetUserPermissions'

export interface UseFollowsList {
  following?: boolean
  followers?: boolean
}

export function useFollowsList({ following, followers }: UseFollowsList = {}) {
  const { user } = useGetUserPermissions()
  const [page, setPage] =
    useState<Required<GetAllUsersRequestQuery>['page']>('1')

  const { data, isLoading, isError, error } = useGetFollows({
    filter: {
      ...(followers && { follower: user?._id }),
      ...(following && { following: user?._id })
    },
    page,
    showFields: {
      follower: true,
      following: true
    }
  })

  const follows = useMemo(() => {
    return (data ?? { items: [] }).items
  }, [data])

  return {
    follows,
    data,
    isLoading,
    isError,
    error,

    page,
    setPage
  }
}
