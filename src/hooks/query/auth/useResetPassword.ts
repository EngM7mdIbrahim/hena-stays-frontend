import { resetPassword } from '@apis'
import { ResetPasswordRequest, ResetPasswordResponse } from '@commonTypes'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type ResetPasswordMutationOptions = UseMutationOptions<
  ResetPasswordResponse,
  ShowError,
  ResetPasswordRequest,
  unknown
>

export const useResetPassword = (options?: ResetPasswordMutationOptions) => {
  return useMutation<ResetPasswordResponse, ShowError, ResetPasswordRequest>({
    ...options,
    mutationFn: (data: ResetPasswordRequest) => {
      return resetPassword(data)
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
