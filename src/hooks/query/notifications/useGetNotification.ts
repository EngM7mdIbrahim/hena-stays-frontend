import { getNotification } from '@apis'
import {
  GetOneNotificationParams,
  GetOneNotificationQuery,
  GetOneNotificationResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetNotificationOptions = UseQueryOptions<
  GetOneNotificationResponse,
  ShowError,
  GetOneNotificationResponse
>

export const useGetNotification = (
  params: GetOneNotificationParams & GetOneNotificationQuery,
  options?: UseGetNotificationOptions
) => {
  return useQuery<GetOneNotificationResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.NOTIFICATIONS.SINGLE_NOTIFICATION(params.id), params],
    queryFn: () => getNotification(params)
  })
}
