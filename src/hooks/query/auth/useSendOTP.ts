import { sendOTP } from '@apis'
import { SendOTPRequest, SendOTPResponse } from '@commonTypes'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type SendOTPMutationOptions = UseMutationOptions<
  SendOTPResponse,
  ShowError,
  SendOTPRequest,
  unknown
>

export const useSendOTP = (options?: SendOTPMutationOptions) => {
  return useMutation<SendOTPResponse, ShowError, SendOTPRequest>({
    ...options,
    mutationFn: (data: SendOTPRequest) => {
      return sendOTP(data)
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
