import { deleteNotification } from '@apis'
import {
  CountUnreadNotificationsResponse,
  DeleteNotificationRequestParams,
  DeleteNotificationResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UseDeleteNotificationOptions = UseMutationOptions<
  DeleteNotificationResponse,
  ShowError,
  DeleteNotificationRequestParams
>

export const useDeleteNotification = (
  options?: UseDeleteNotificationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation<
    DeleteNotificationResponse,
    ShowError,
    DeleteNotificationRequestParams
  >({
    ...options,
    mutationFn: (params: DeleteNotificationRequestParams) =>
      deleteNotification(params),

    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.NOTIFICATIONS.ALL]
      })
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.NOTIFICATIONS.COUNT_UNREAD], exact: false },
        (oldData: CountUnreadNotificationsResponse) => {
          return {
            count: oldData.count - 1
          }
        }
      )
    },
    onError(err, variables, _context) {
      getError(err)
      options?.onError?.(err, variables, _context)
    }
  })
}
