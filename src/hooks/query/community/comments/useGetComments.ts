import { getComments } from '@apis'
import {
  FindAllCommentsRequestQuery,
  FindAllCommentsResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetCommentsOptions = UseInfiniteQueryOptions<
  FindAllCommentsResponse,
  ShowError,
  InfiniteData<FindAllCommentsResponse>
>

export const useGetComments = (
  params: FindAllCommentsRequestQuery,
  options?: UseGetCommentsOptions
) => {
  return useInfiniteQuery<
    FindAllCommentsResponse,
    ShowError,
    InfiniteData<FindAllCommentsResponse>
  >({
    ...options,
    queryKey: [QUERY_KEYS.COMMUNITY.COMMENTS, params],
    queryFn: ({ pageParam = 1 }) =>
      getComments({ ...params, page: (pageParam as number).toString() }),
    getNextPageParam: (lastPage) => {
      const { page, hasNext } = lastPage
      return hasNext ? (page + 1).toString() : undefined
    },
    initialPageParam: 1
  })
}
