import { getChatMessages } from '@apis'
import {
  FindAllMessagesByChatQuery,
  FindAllMessagesByChatRequestParams,
  FindAllMessagesByChatResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetChatMessagesOptions = UseInfiniteQueryOptions<
  FindAllMessagesByChatResponse,
  ShowError,
  InfiniteData<FindAllMessagesByChatResponse>
>

const keys = [QUERY_KEYS.CHATS.CHATS_MESSAGES]

export const useGetChatMessages = (
  params: FindAllMessagesByChatRequestParams & FindAllMessagesByChatQuery,
  options?: Partial<UseGetChatMessagesOptions>
) => {
  return useInfiniteQuery<
    FindAllMessagesByChatResponse,
    ShowError,
    InfiniteData<FindAllMessagesByChatResponse>
  >({
    ...options,
    queryKey: [...keys, params],
    queryFn: ({ pageParam = 1 }) =>
      getChatMessages({ ...params, page: (pageParam as number).toString() }),
    getNextPageParam: (lastPage) => {
      const { page, hasNext } = lastPage
      return hasNext ? (page + 1).toString() : undefined
    },
    initialPageParam: 1,
    enabled: !!params.id
  })
}
