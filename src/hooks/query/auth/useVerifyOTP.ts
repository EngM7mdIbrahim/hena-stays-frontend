import { verifyOTP } from '@apis'
import { VerifyOTPRequest, VerifyOTPResponse } from '@commonTypes'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type VerifyOTPMutationOptions = UseMutationOptions<
  VerifyOTPResponse,
  ShowError,
  VerifyOTPRequest,
  unknown
>

export const useVerifyOTP = (options?: VerifyOTPMutationOptions) => {
  return useMutation<VerifyOTPResponse, ShowError, VerifyOTPRequest>({
    ...options,
    mutationFn: (data: VerifyOTPRequest) => {
      return verifyOTP(data)
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
