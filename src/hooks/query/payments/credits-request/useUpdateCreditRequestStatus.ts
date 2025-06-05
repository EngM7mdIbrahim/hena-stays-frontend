import { updateCreditRequestStatus } from '@apis'
import {
  UpdateCreditRequestsBody,
  UpdateCreditRequestsParam,
  UpdateCreditRequestsResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UpdateCreditRequestStatusMutationOptions = UseMutationOptions<
  UpdateCreditRequestsResponse,
  ShowError,
  UpdateCreditRequestsBody & UpdateCreditRequestsParam,
  unknown
>

export const useUpdateCreditRequestStatus = (
  options?: UpdateCreditRequestStatusMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateCreditRequestsBody & UpdateCreditRequestsParam) =>
      updateCreditRequestStatus(data),
    onSuccess(data, variables, _context) {
      options?.onSuccess?.(data, variables, _context)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PAYMENT.CREDITS_REQUEST.ALL]
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
