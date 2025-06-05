import { deleteMe } from '@apis'
import { DeleteUserResponse } from '@commonTypes'
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
  unknown
>

export const useDeleteMe = (options?: DeleteUserMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<DeleteUserResponse, ShowError>({
    ...options,
    mutationFn: async () => {
      const response = await deleteMe()
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
