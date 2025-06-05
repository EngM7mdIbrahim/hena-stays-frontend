import { createPost } from '@apis'
import { CreatePostRequest, CreatePostResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type CreatePostMutationOptions = UseMutationOptions<
  CreatePostResponse,
  ShowError,
  CreatePostRequest,
  unknown
>
export const useCreatePost = (options?: CreatePostMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePostRequest) => {
      return createPost(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMUNITY.POSTS] })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
