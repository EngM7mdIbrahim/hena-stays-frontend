import { usePathname } from 'next/navigation'
import { deleteLike } from '@apis'
import {
  Comment,
  DeleteLikeRequest,
  DeleteLikeResponse,
  FindAllCommentsResponse,
  FindAllPostsResponse,
  FindPostResponse,
  Post
} from '@commonTypes'
import { navigationLinks, QUERY_KEYS } from '@constants'
import { isInfiniteData, isPopulated } from '@guards'
import {
  InfiniteData,
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { extractId, getError } from '@utils'

type DeleteLikeMutationOptions = UseMutationOptions<
  DeleteLikeResponse,
  ShowError,
  DeleteLikeRequest,
  unknown
>

export const useDeleteLike = (options?: DeleteLikeMutationOptions) => {
  const queryClient = useQueryClient()
  const pathname = usePathname()

  return useMutation<DeleteLikeResponse, ShowError, DeleteLikeRequest>({
    ...options,
    mutationFn: async (data: DeleteLikeRequest) => {
      const response = await deleteLike(data)
      return response.data
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)

      const { comment } = data.like
      const { post } = data.like
      if (isPopulated<Comment>(comment)) {
        queryClient.setQueriesData(
          {
            queryKey: [QUERY_KEYS.COMMUNITY.COMMENTS],
            exact: false
          },
          (oldData: InfiniteData<FindAllCommentsResponse>) => {
            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                items: page.items.map((item) =>
                  item._id === extractId(comment, '_id')
                    ? { ...comment, isLikedByMe: false }
                    : item
                )
              }))
            }
          }
        )
      } else if (isPopulated<Post>(post)) {
        queryClient.setQueriesData(
          {
            queryKey: [
              pathname.includes(navigationLinks.community.savedPosts)
                ? QUERY_KEYS.COMMUNITY.SAVES
                : QUERY_KEYS.COMMUNITY.POSTS
            ],
            exact: false
          },
          (oldData: InfiniteData<FindAllPostsResponse> | FindPostResponse) => {
            if (isInfiniteData<FindAllPostsResponse>(oldData)) {
              return {
                ...oldData,
                pages: oldData.pages.map((page) => ({
                  ...page,
                  items: page.items.map((item) =>
                    item._id === extractId(post, '_id')
                      ? { ...post, isLikedByMe: false }
                      : item
                  )
                }))
              }
            }
            return {
              post: {
                ...oldData?.post,
                likes: Number(oldData?.post?.likes) - 1,
                isLikedByMe: false
              }
            }
          }
        )
      }
    },
    onError(err, variables, _context) {
      getError(err)
      options?.onError?.(err, variables, _context)
    }
  })
}
