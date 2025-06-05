import { forgetPassword } from '@apis'
import { ForgetPasswordRequest, ForgetPasswordResponse } from '@commonTypes'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type ForgetPasswordMutationOptions = UseMutationOptions<
  ForgetPasswordResponse,
  ShowError,
  ForgetPasswordRequest,
  unknown
>

export const useForgetPassword = (options?: ForgetPasswordMutationOptions) => {
  return useMutation<ForgetPasswordResponse, ShowError, ForgetPasswordRequest>({
    ...options,
    mutationFn: (data) => {
      return forgetPassword(data)
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
