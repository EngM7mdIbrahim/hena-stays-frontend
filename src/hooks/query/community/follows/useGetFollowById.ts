import { getFollowById } from '@apis'
import { FindFollowRequest, FindFollowResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetFollowByIdOptions = UseQueryOptions<
  FindFollowResponse,
  ShowError,
  FindFollowRequest
>

export const useGetFollowById = (
  { id }: FindFollowRequest,
  options?: UseGetFollowByIdOptions
) => {
  return useQuery<FindFollowResponse, ShowError, FindFollowRequest>({
    ...options,
    queryKey: [QUERY_KEYS.COMMUNITY.FOLLOWS, id],
    queryFn: () => getFollowById({ id }),
    enabled: !!id || options?.enabled
  })
}
