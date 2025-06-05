import { deletePostSave } from '@apis'
import {
  DeletePostSaveRequest,
  DeletePostSaveResponse,
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
import { extractId, getError } from '@utils'

type DeletePostSaveMutationOptions = UseMutationOptions<
  DeletePostSaveResponse,
  ShowError,
  DeletePostSaveRequest,
  unknown
>

export const useDeletePostSave = (options?: DeletePostSaveMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<DeletePostSaveResponse, ShowError, DeletePostSaveRequest>({
    ...options,
    mutationFn: async (data: DeletePostSaveRequest) => {
      const response = await deletePostSave(data)
      return response.data
    },
    onSuccess(data, variables, _context) {
      options?.onSuccess?.(data, variables, _context)
      const currentPost = data.save.post
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMUNITY.SAVES] })
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.COMMUNITY.POSTS], exact: false },
        (oldData: InfiniteData<FindAllPostsResponse> | FindPostResponse) => {
          if (isInfiniteData<FindAllPostsResponse>(oldData)) {
            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                items: page.items.map((post) =>
                  post._id === extractId(currentPost, '_id')
                    ? {
                        ...post,
                        saves: post.saves - 1,
                        isSavedByMe: false
                      }
                    : post
                )
              }))
            }
          }
          return {
            post: {
              ...oldData?.post,
              saves: Number(oldData?.post?.saves) - 1,
              isSavedByMe: false
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
