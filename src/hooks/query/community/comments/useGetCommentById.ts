import { getCommentById } from '@apis'
import { FindCommentRequestParams, FindCommentResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetCommentByIdOptions = UseQueryOptions<
  FindCommentResponse,
  ShowError,
  FindCommentRequestParams
>

export const useGetCommentById = (
  { id }: FindCommentRequestParams,
  options?: UseGetCommentByIdOptions
) => {
  return useQuery<FindCommentResponse, ShowError, FindCommentRequestParams>({
    ...options,
    queryKey: [QUERY_KEYS.COMMUNITY.COMMENTS, id],
    queryFn: () => getCommentById({ id }),
    enabled: !!id || options?.enabled
  })
}
