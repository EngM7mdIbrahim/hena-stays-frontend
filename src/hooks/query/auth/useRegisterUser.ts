import { registerUser } from '@apis'
import { RegisterRequest, RegisterUserResponse } from '@commonTypes'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type RegisterUserMutationOptions = UseMutationOptions<
  RegisterUserResponse,
  ShowError,
  RegisterRequest,
  unknown
>

export const useRegisterUser = (options?: RegisterUserMutationOptions) => {
  return useMutation<RegisterUserResponse, ShowError, RegisterRequest>({
    ...options,
    mutationFn: (data: RegisterRequest) => {
      return registerUser(data)
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
