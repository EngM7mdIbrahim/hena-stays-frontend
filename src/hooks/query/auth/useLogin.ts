import { login } from '@apis'
import { LoginRequest, LoginResponse } from '@commonTypes'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type LoginMutationOptions = UseMutationOptions<
  LoginResponse,
  ShowError,
  LoginRequest,
  unknown
>
export const useLogin = (options?: LoginMutationOptions) => {
  return useMutation<LoginResponse, ShowError, LoginRequest>({
    ...options,
    mutationFn: (data: LoginRequest) => {
      return login(data)
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
