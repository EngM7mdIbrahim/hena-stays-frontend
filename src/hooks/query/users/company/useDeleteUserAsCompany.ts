import { deleteUserAsCompany } from '@apis'
import { DeleteUserRequestParams, DeleteUserResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type DeleteUserMutationOptions = UseMutationOptions<
  DeleteUserResponse,
  ShowError,
  DeleteUserRequestParams,
  unknown
>

export const useDeleteUserAsCompany = (options?: DeleteUserMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<DeleteUserResponse, ShowError, DeleteUserRequestParams>({
    ...options,
    mutationFn: async ({ id }: DeleteUserRequestParams) => {
      const response = await deleteUserAsCompany({ id })
      return response.data
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS.USERS] })
    },
    onError(err, variables, _context) {
      getError(err)
      options?.onError?.(err, variables, _context)
    }
  })
}
