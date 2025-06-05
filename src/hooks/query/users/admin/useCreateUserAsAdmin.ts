import { createUserAsAdmin } from '@apis'
import { CreateAsAdminRequest, CreateCompanyUserResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'

export type CreateUserAsAdminMutationOptions = UseMutationOptions<
  CreateCompanyUserResponse,
  ShowError,
  CreateAsAdminRequest
>

export const useCreateUserAsAdmin = (
  options?: CreateUserAsAdminMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation<
    CreateCompanyUserResponse,
    ShowError,
    CreateAsAdminRequest
  >({
    ...options,
    mutationFn: (data: CreateAsAdminRequest) => {
      return createUserAsAdmin(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS.USERS]
      })
    },
    onError(err, _variables, _context) {
      options?.onError?.(err, _variables, _context)
    }
  })
}
