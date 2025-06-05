import { getLikes } from '@apis'
import { FindAllLikesRequestQuery, FindAllLikesResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetLikesOptions = UseQueryOptions<
  FindAllLikesResponse,
  ShowError,
  FindAllLikesRequestQuery
>

export const useGetLikes = (
  params: FindAllLikesRequestQuery = {},
  options?: UseGetLikesOptions
) => {
  return useQuery<FindAllLikesResponse, ShowError, FindAllLikesRequestQuery>({
    ...options,
    queryKey: [QUERY_KEYS.COMMUNITY.LIKES, params],
    queryFn: () => getLikes(params)
  })
}
