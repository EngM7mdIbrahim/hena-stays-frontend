import { createCreditsWithCard } from '@apis'
import {
  PaymentCreditsCheckoutRequestBody,
  PaymentCreditsCheckoutResponseBody
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type CreateSessionCreditsMutationOptions = UseMutationOptions<
  PaymentCreditsCheckoutResponseBody,
  ShowError,
  PaymentCreditsCheckoutRequestBody,
  unknown
>

export const useCreateCreditsWithCard = (
  options?: CreateSessionCreditsMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PaymentCreditsCheckoutRequestBody) => {
      return createCreditsWithCard(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PAYMENT.CREDITS]
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
