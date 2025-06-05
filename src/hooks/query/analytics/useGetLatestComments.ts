import { getLatestComments } from '@apis'
import { GetAnalyticsQuery, GetLatestCommentsResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetLatestCommentsOptions = UseQueryOptions<
  GetLatestCommentsResponse,
  ShowError,
  GetLatestCommentsResponse
>

export const useGetLatestComments = (
  params: GetAnalyticsQuery,
  options?: UseGetLatestCommentsOptions
) => {
  return useQuery<GetLatestCommentsResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.ANALYTICS.LATEST_COMMENTS, params],
    queryFn: () => getLatestComments(params)
  })
}
