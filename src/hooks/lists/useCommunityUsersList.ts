import { useMemo } from 'react'

import { useGetAllUsers } from '@hooks/query'

export function useCommunityUsersList() {
  const { data, isLoading, isError, error } = useGetAllUsers({
    limit: '10'
  })

  const users = useMemo(() => {
    return (data ?? { items: [] }).users
  }, [data])

  return {
    users,
    data,
    isLoading,
    isError,
    error
  }
}
