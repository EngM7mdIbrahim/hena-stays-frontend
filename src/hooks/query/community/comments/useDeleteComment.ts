import { deleteComment } from '@apis'
import {
  DeleteCommentRequest,
  DeleteCommentResponse,
  FindAllPostsResponse,
  FindPostResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { isInfiniteData } from '@guards'
import {
  InfiniteData,
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type DeleteCommentMutationOptions = UseMutationOptions<
  DeleteCommentResponse,
  ShowError,
  DeleteCommentRequest,
  unknown
>

export const useDeleteComment = (options?: DeleteCommentMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<DeleteCommentResponse, ShowError, DeleteCommentRequest>({
    ...options,
    mutationFn: async ({ id }: DeleteCommentRequest) => {
      const response = await deleteComment({ id })
      return response.data
    },
    onSuccess(data, variables, _context) {
      options?.onSuccess?.(data, variables, _context)

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.COMMUNITY.COMMENTS]
      })
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.COMMUNITY.POSTS], exact: false },
        (oldData: InfiniteData<FindAllPostsResponse> | FindPostResponse) => {
          if (isInfiniteData<FindAllPostsResponse>(oldData)) {
            return {
              ...oldData,
              pages: oldData.pages.map((page) => {
                return {
                  ...page,
                  items: page.items.map((post) => {
                    return {
                      ...post,
                      comments: post.comments - 1
                    }
                  })
                }
              })
            }
          }
          return {
            post: {
              ...oldData?.post,
              comments: Number(oldData?.post?.comments) - 1
            }
          }
        }
      )
    },
    onError(err, variables, _context) {
      getError(err)
      options?.onError?.(err, variables, _context)
    }
  })
}
