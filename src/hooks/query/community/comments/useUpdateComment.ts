import { updateComment } from '@apis'
import { UpdateCommentRequest, UpdateCommentResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UpdateCommentMutationOptions = UseMutationOptions<
  UpdateCommentResponse,
  ShowError,
  UpdateCommentRequest,
  unknown
>
const keys = [QUERY_KEYS.COMMUNITY.COMMENTS, QUERY_KEYS.COMMUNITY.POSTS]

export const useUpdateComment = (options?: UpdateCommentMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<UpdateCommentResponse, ShowError, UpdateCommentRequest>({
    ...options,
    mutationFn: (data: UpdateCommentRequest) => {
      return updateComment(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)

      keys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] })
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
