import { getPosts } from '@apis'
import { FindAllPostsRequestQuery, FindAllPostsResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetPostsOptions = UseInfiniteQueryOptions<
  FindAllPostsResponse,
  ShowError,
  InfiniteData<FindAllPostsResponse>
>

export const useGetPosts = (
  params: FindAllPostsRequestQuery,
  options?: UseGetPostsOptions
) => {
  return useInfiniteQuery<
    FindAllPostsResponse,
    ShowError,
    InfiniteData<FindAllPostsResponse>
  >({
    ...options,
    queryKey: [QUERY_KEYS.COMMUNITY.POSTS, params],
    queryFn: ({ pageParam = 1 }) =>
      getPosts({ ...params, page: (pageParam as number).toString() }),
    getNextPageParam: (lastPage) => {
      const { page, hasNext } = lastPage
      return hasNext ? (page + 1).toString() : undefined
    },
    initialPageParam: 1
  })
}
