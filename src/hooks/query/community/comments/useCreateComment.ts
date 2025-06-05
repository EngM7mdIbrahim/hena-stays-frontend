import { createComment } from '@apis'
import {
  CreateCommentRequest,
  CreateCommentResponse,
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

type CreateCommentMutationOptions = UseMutationOptions<
  CreateCommentResponse,
  ShowError,
  CreateCommentRequest,
  unknown
>

export const useCreateComment = (options?: CreateCommentMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<CreateCommentResponse, ShowError, CreateCommentRequest>({
    ...options,
    mutationFn: (data: CreateCommentRequest) => {
      return createComment(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
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
                      comments: post.comments + 1
                    }
                  })
                }
              })
            }
          }
          return {
            post: {
              ...oldData?.post,
              comments: Number(oldData?.post?.comments) + 1
            }
          }
        }
      )
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
