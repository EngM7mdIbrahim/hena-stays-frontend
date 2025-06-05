import { updateSubscription } from '@apis'
import {
  UpdateSubscriptionRequestBody,
  UpdateSubscriptionRequestParams,
  UpdateSubscriptionResponseBody
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UpdateSubscriptionMutationOptions = UseMutationOptions<
  UpdateSubscriptionResponseBody,
  ShowError,
  UpdateSubscriptionRequestParams & UpdateSubscriptionRequestBody,
  unknown
>
export const useUpdateSubscription = (
  options?: UpdateSubscriptionMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation<
    UpdateSubscriptionResponseBody,
    ShowError,
    UpdateSubscriptionRequestParams & UpdateSubscriptionRequestBody
  >({
    ...options,
    mutationFn: (
      data: UpdateSubscriptionRequestParams & UpdateSubscriptionRequestBody
    ) => {
      return updateSubscription(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SUBSCRIPTIONS.SUBSCRIPTIONS]
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
