import { getPostById } from '@apis'
import {
  FindOnePostQuery,
  FindPostRequestParams,
  FindPostResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetPostByIdOptions = UseQueryOptions<
  FindPostResponse,
  ShowError,
  FindPostResponse
>

export const useGetPostById = (
  params: FindPostRequestParams & FindOnePostQuery,
  options?: UseGetPostByIdOptions
) => {
  return useQuery<FindPostResponse, ShowError, FindPostResponse>({
    ...options,
    queryKey: [QUERY_KEYS.COMMUNITY.POSTS, params],
    queryFn: () => getPostById(params),
    enabled: !!params.id
  })
}
