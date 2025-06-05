import { deleteFollow } from '@apis'
import { DeleteFollowRequest, DeleteFollowResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type DeleteFollowMutationOptions = UseMutationOptions<
  DeleteFollowResponse,
  ShowError,
  DeleteFollowRequest,
  unknown
>
const keys = [
  QUERY_KEYS.COMMUNITY.FOLLOWS,
  QUERY_KEYS.COMMUNITY.POSTS,
  QUERY_KEYS.COMMUNITY.PROFILE
]
export const useDeleteFollow = (options?: DeleteFollowMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<DeleteFollowResponse, ShowError, DeleteFollowRequest>({
    ...options,
    mutationFn: async (data: DeleteFollowRequest) => {
      const response = await deleteFollow(data)
      return response.data
    },
    onSuccess(data, variables, _context) {
      options?.onSuccess?.(data, variables, _context)
      keys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] })
      })
    },
    onError(err, variables, _context) {
      getError(err)
      options?.onError?.(err, variables, _context)
    }
  })
}
