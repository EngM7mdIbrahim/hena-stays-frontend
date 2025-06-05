import { getCommunityAnalytics } from '@apis'
import { GetAnalyticsQuery, GetCommunityAnalyticsResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetCommunityAnalyticsOptions = UseQueryOptions<
  GetCommunityAnalyticsResponse,
  ShowError,
  GetCommunityAnalyticsResponse
>

export const useGetCommunityAnalytics = (
  params: GetAnalyticsQuery,
  options?: UseGetCommunityAnalyticsOptions
) => {
  return useQuery<GetCommunityAnalyticsResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.ANALYTICS.COMMUNITY_ANALYTICS, params],
    queryFn: () => getCommunityAnalytics(params)
  })
}
