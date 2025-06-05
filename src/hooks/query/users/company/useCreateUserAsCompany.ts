import { createUserAsCompany } from '@apis'
import {
  CreateCompanyUserRequest,
  CreateCompanyUserResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type CreateUserAsCompanyMutationOptions = UseMutationOptions<
  CreateCompanyUserResponse,
  ShowError,
  CreateCompanyUserRequest
>

export const useCreateUserAsCompany = (
  options?: CreateUserAsCompanyMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCompanyUserRequest) => createUserAsCompany(data),
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS.USERS]
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
