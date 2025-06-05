import { getChats } from '@apis'
import { FindAllChatsRequestQuery, FindAllChatsResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetChatsOptions = UseInfiniteQueryOptions<
  FindAllChatsResponse,
  ShowError,
  InfiniteData<FindAllChatsResponse>
>

const keys = [QUERY_KEYS.CHATS.CHATS]

export const useGetChats = (
  params: FindAllChatsRequestQuery,
  options?: UseGetChatsOptions
) => {
  return useInfiniteQuery<
    FindAllChatsResponse,
    ShowError,
    InfiniteData<FindAllChatsResponse>
  >({
    ...options,
    queryKey: [...keys, params],
    queryFn: ({ pageParam = 1 }) =>
      getChats({ ...params, page: (pageParam as number).toString() }),
    getNextPageParam: (lastPage) => {
      const { page, hasNext } = lastPage
      return hasNext ? (page + 1).toString() : undefined
    },
    initialPageParam: 1
  })
}
