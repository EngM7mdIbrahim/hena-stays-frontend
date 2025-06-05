import { getLikeById } from '@apis'
import { FindLikeRequest, FindLikeResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetLikeByIdOptions = UseQueryOptions<
  FindLikeResponse,
  ShowError,
  FindLikeRequest
>

export const useGetLikeById = (
  { id }: FindLikeRequest,
  options?: UseGetLikeByIdOptions
) => {
  return useQuery<FindLikeResponse, ShowError, FindLikeRequest>({
    ...options,
    queryKey: [QUERY_KEYS.COMMUNITY.LIKES, id],
    queryFn: () => getLikeById({ id }),
    enabled: !!id
  })
}
