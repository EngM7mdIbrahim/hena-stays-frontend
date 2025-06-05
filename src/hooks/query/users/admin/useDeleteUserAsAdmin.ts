import { deleteUserAsAdmin } from '@apis'
import { DeleteUserRequestParams, DeleteUserResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

export type DeleteUserAsAdminMutationOptions = UseMutationOptions<
  DeleteUserResponse,
  ShowError,
  DeleteUserRequestParams
>

export const useDeleteUserAsAdmin = (
  options?: DeleteUserAsAdminMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation<DeleteUserResponse, ShowError, DeleteUserRequestParams>({
    ...options,
    mutationFn: async ({ id }) => {
      const response = await deleteUserAsAdmin({ id })
      return response.data
    },
    onSuccess(data, variables, _context) {
      options?.onSuccess?.(data, variables, _context)
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
