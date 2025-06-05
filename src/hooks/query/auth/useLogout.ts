import { logout } from '@apis'
import { LogoutRequestBody, LogoutResponse } from '@commonTypes'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type LogoutMutationOptions = UseMutationOptions<
  LogoutResponse,
  ShowError,
  LogoutRequestBody,
  unknown
>
export const useLogout = (options?: LogoutMutationOptions) => {
  return useMutation<LogoutResponse, ShowError, LogoutRequestBody>({
    ...options,
    mutationFn: (data: LogoutRequestBody) => {
      return logout(data)
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
