import { createCreditsRequest } from '@apis'
import { CreateCreditRequestsBody, CreateCreditResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type CreateCreditsRequestMutationOptions = UseMutationOptions<
  CreateCreditResponse,
  ShowError,
  CreateCreditRequestsBody,
  unknown
>

export const useCreateCreditsRequest = (
  options?: CreateCreditsRequestMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCreditRequestsBody) => createCreditsRequest(data),
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
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
