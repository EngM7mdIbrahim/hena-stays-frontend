import { getPostSaves } from '@apis'
import {
  FindAllPostSavesRequestQuery,
  FindAllPostSavesResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetPostSavesOptions = UseInfiniteQueryOptions<
  FindAllPostSavesResponse,
  ShowError,
  InfiniteData<FindAllPostSavesResponse>
>

export const useGetPostSaves = (
  params: FindAllPostSavesRequestQuery,
  options?: UseGetPostSavesOptions
) => {
  return useInfiniteQuery<
    FindAllPostSavesResponse,
    ShowError,
    InfiniteData<FindAllPostSavesResponse>
  >({
    ...options,
    queryKey: [QUERY_KEYS.COMMUNITY.SAVES, params],
    queryFn: ({ pageParam = 1 }) =>
      getPostSaves({ ...params, page: (pageParam as number).toString() }),
    getNextPageParam: (lastPage) => {
      const { page, hasNext } = lastPage
      return hasNext ? (page + 1).toString() : undefined
    },
    initialPageParam: 1
  })
}
