import { updateMe } from '@apis'
import { UpdateUserRequestBody, UpdateUserResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UpdateMeMutationOptions = UseMutationOptions<
  UpdateUserResponse,
  ShowError,
  UpdateUserRequestBody
>

export const useUpdateMe = (options?: UpdateMeMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<UpdateUserResponse, ShowError, UpdateUserRequestBody>({
    ...options,
    mutationFn: (data: UpdateUserRequestBody) => {
      return updateMe(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS.ME]
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
