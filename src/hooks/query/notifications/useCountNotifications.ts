import { getCountNotifications } from '@apis'
import { CountUnreadNotificationsResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetNotificationOptions = UseQueryOptions<
  CountUnreadNotificationsResponse,
  ShowError,
  CountUnreadNotificationsResponse
>

export const useCountNotifications = (options?: UseGetNotificationOptions) => {
  return useQuery<CountUnreadNotificationsResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.NOTIFICATIONS.COUNT_UNREAD],
    queryFn: () => getCountNotifications()
  })
}
