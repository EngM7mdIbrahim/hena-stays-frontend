import { getNotifications } from '@apis'
import {
  GetAllNotificationsQuery,
  GetAllNotificationsResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetNotificationsOptions = UseInfiniteQueryOptions<
  GetAllNotificationsResponse,
  ShowError,
  InfiniteData<GetAllNotificationsResponse>
>

export const useGetNotifications = (
  params: GetAllNotificationsQuery,
  options?: UseGetNotificationsOptions
) => {
  return useInfiniteQuery<
    GetAllNotificationsResponse,
    ShowError,
    InfiniteData<GetAllNotificationsResponse>
  >({
    ...options,
    queryKey: [QUERY_KEYS.NOTIFICATIONS.ALL, params],
    queryFn: ({ pageParam = 1 }) =>
      getNotifications({ ...params, page: (pageParam as number).toString() }),
    getNextPageParam: (lastPage) => {
      const { page, hasNext } = lastPage
      return hasNext ? (page + 1).toString() : undefined
    },
    initialPageParam: 1
  })
}
