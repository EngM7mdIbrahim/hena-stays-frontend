import { getBlogs } from '@apis'
import { FindAllBlogsRequestQuery, FindAllBlogsResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetBlogsOptions = UseInfiniteQueryOptions<
  FindAllBlogsResponse,
  ShowError,
  InfiniteData<FindAllBlogsResponse>
>

export const useGetBlogs = (
  params: FindAllBlogsRequestQuery,
  options?: UseGetBlogsOptions
) => {
  return useInfiniteQuery<
    FindAllBlogsResponse,
    ShowError,
    InfiniteData<FindAllBlogsResponse>
  >({
    ...options,
    queryKey: [QUERY_KEYS.COMMUNITY.Blogs, params],
    queryFn: ({ pageParam = 1 }) =>
      getBlogs({ ...params, page: (pageParam as number).toString() }),
    getNextPageParam: (lastPage) => {
      const { page, hasNext } = lastPage
      return hasNext ? (page + 1).toString() : undefined
    },
    initialPageParam: 1
  })
}
