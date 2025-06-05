import { deletePost } from '@apis'
import { DeletePostRequest, DeletePostResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type DeletePostMutationOptions = UseMutationOptions<
  DeletePostResponse,
  ShowError,
  DeletePostRequest,
  unknown
>
export const useDeletePost = (options?: DeletePostMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<DeletePostResponse, ShowError, DeletePostRequest>({
    ...options,
    mutationFn: async ({ id }: DeletePostRequest) => {
      const response = await deletePost({ id })
      return response.data
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMUNITY.POSTS] })
    },
    onError(err, variables, _context) {
      getError(err)
      options?.onError?.(err, variables, _context)
    }
  })
}
