import { usePathname } from 'next/navigation'
import { createLike } from '@apis'
import {
  Comment,
  CreateLikeRequest,
  CreateLikeResponse,
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

type CreateLikeMutationOptions = UseMutationOptions<
  CreateLikeResponse,
  ShowError,
  CreateLikeRequest,
  unknown
>

export const useCreateLike = (options?: CreateLikeMutationOptions) => {
  const queryClient = useQueryClient()
  const pathname = usePathname()

  return useMutation<CreateLikeResponse, ShowError, CreateLikeRequest>({
    ...options,
    mutationFn: (data: CreateLikeRequest) => {
      return createLike(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      const { post, comment } = data.like
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
                    ? { ...comment, isLikedByMe: true }
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
                      ? { ...post, isLikedByMe: true }
                      : item
                  )
                }))
              }
            }
            // this is for single post view interactions

            return {
              post: {
                ...oldData?.post,
                likes: Number(oldData?.post?.likes) + 1,
                isLikedByMe: true
              }
            }
          }
        )
      }
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
