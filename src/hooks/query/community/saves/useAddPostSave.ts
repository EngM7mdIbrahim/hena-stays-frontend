import { addPostSave } from '@apis'
import {
  AddPostSaveRequest,
  AddPostSaveResponse,
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

type AddPostSaveMutationOptions = UseMutationOptions<
  AddPostSaveResponse,
  ShowError,
  AddPostSaveRequest,
  unknown
>

export const useAddPostSave = (options?: AddPostSaveMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<AddPostSaveResponse, ShowError, AddPostSaveRequest>({
    ...options,
    mutationFn: (data: AddPostSaveRequest) => {
      return addPostSave(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
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
                        saves: post.saves + 1,
                        isSavedByMe: true
                      }
                    : post
                )
              }))
            }
          }
          return {
            post: {
              ...oldData?.post,
              saves: Number(oldData?.post?.saves) + 1,
              isSavedByMe: true
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
