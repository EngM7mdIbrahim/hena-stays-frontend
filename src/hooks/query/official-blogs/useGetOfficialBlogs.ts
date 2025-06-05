import { getOfficialBlogs } from '@apis'
import {
  FindAllOfficialBlogsRequestQuery,
  FindAllOfficialBlogsResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetOfficialBlogsOptions = UseInfiniteQueryOptions<
  FindAllOfficialBlogsResponse,
  ShowError,
  InfiniteData<FindAllOfficialBlogsResponse>
>

export const useGetOfficialBlogs = (
  params: FindAllOfficialBlogsRequestQuery,
  options?: Partial<UseGetOfficialBlogsOptions>
) => {
  return useInfiniteQuery<
    FindAllOfficialBlogsResponse,
    ShowError,
    InfiniteData<FindAllOfficialBlogsResponse>
  >({
    ...options,
    queryKey: [QUERY_KEYS.OFFICIAL_BLOGS.OFFICIAL_BLOGS, params],
    queryFn: ({ pageParam = 1 }) =>
      getOfficialBlogs({ ...params, page: (pageParam as number).toString() }),
    getNextPageParam: (lastPage) => {
      const { page, hasNext } = lastPage
      return hasNext ? (page + 1).toString() : undefined
    },
    initialPageParam: 1
  })
}
