import { getPropertiesAnalytics } from '@apis'
import { GetAnalyticsQuery, GetPropertiesAnalyticsResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetPropertiesAnalyticsOptions = UseQueryOptions<
  GetPropertiesAnalyticsResponse,
  ShowError,
  GetPropertiesAnalyticsResponse
>

export const useGetPropertiesAnalytics = (
  params: GetAnalyticsQuery,
  options?: UseGetPropertiesAnalyticsOptions
) => {
  return useQuery<GetPropertiesAnalyticsResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.ANALYTICS.PROPERTIES, params],
    queryFn: () => getPropertiesAnalytics(params),
    refetchOnWindowFocus: false
  })
}
