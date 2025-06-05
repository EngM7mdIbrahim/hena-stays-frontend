import { deleteAllNotifications } from '@apis'
import { DeleteAllNotificationsResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UseDeleteAllNotificationsOptions = UseMutationOptions<
  DeleteAllNotificationsResponse,
  ShowError,
  void
>

export const useDeleteAllNotifications = (
  options?: UseDeleteAllNotificationsOptions
) => {
  const queryClient = useQueryClient()

  return useMutation<DeleteAllNotificationsResponse, ShowError, void>({
    ...options,
    mutationFn: () => deleteAllNotifications(),
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.NOTIFICATIONS.ALL]
      })
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.NOTIFICATIONS.COUNT_UNREAD], exact: false },
        () => 0
      )
    },
    onError(err, variables, _context) {
      getError(err)
      options?.onError?.(err, variables, _context)
    }
  })
}
