import { getFollows } from '@apis'
import {
  FindAllFollowsRequestQuery,
  FindAllFollowsResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetFollowsOptions = UseQueryOptions<
  FindAllFollowsResponse,
  ShowError,
  FindAllFollowsResponse
>

export const useGetFollows = (
  params: FindAllFollowsRequestQuery,
  options?: UseGetFollowsOptions
) => {
  return useQuery<FindAllFollowsResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.COMMUNITY.FOLLOWS, params],
    queryFn: () => getFollows(params),
    refetchOnWindowFocus: false
  })
}
