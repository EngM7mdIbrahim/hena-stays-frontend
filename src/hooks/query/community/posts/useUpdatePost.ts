import { usePathname } from 'next/navigation'
import { updatePost } from '@apis'
import { UpdatePostRequest, UpdatePostResponse } from '@commonTypes'
import { navigationLinks, QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UpdatePostMutationOptions = UseMutationOptions<
  UpdatePostResponse,
  ShowError,
  UpdatePostRequest,
  unknown
>
export const useUpdatePost = (options?: UpdatePostMutationOptions) => {
  const queryClient = useQueryClient()
  const pathname = usePathname()

  return useMutation<UpdatePostResponse, ShowError, UpdatePostRequest>({
    ...options,
    mutationFn: (data: UpdatePostRequest) => {
      return updatePost(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)

      queryClient.invalidateQueries({
        queryKey: [
          pathname?.includes(navigationLinks.community.savedPosts)
            ? QUERY_KEYS.COMMUNITY.SAVES
            : QUERY_KEYS.COMMUNITY.POSTS
        ]
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
