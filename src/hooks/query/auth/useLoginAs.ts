import { loginAs } from '@apis'
import { LoginAsRequest, LoginAsResponse } from '@commonTypes'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type LoginAsMutationOptions = UseMutationOptions<
  LoginAsResponse,
  ShowError,
  LoginAsRequest,
  unknown
>
export const useLoginAs = (options?: LoginAsMutationOptions) => {
  return useMutation<LoginAsResponse, ShowError, LoginAsRequest>({
    ...options,
    mutationFn: (data: LoginAsRequest) => {
      return loginAs(data)
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
