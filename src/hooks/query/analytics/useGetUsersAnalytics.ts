import { getUsersAnalytics } from '@apis'
import { GetUserAnalyticsResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

export type UseGetUsersAnalyticsOptions = UseQueryOptions<
  GetUserAnalyticsResponse,
  ShowError,
  GetUserAnalyticsResponse
>

export const useGetUsersAnalytics = (options?: UseGetUsersAnalyticsOptions) => {
  return useQuery<GetUserAnalyticsResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.ANALYTICS.USERS],
    queryFn: () => getUsersAnalytics(),
    refetchOnWindowFocus: false
  })
}
