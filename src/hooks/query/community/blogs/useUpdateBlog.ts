import { updateBlog } from '@apis'
import { UpdateBlogRequest, UpdateBlogResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UpdateBlogMutationOptions = UseMutationOptions<
  UpdateBlogResponse,
  ShowError,
  UpdateBlogRequest,
  unknown
>
export const useUpdateBlog = (options?: UpdateBlogMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<UpdateBlogResponse, ShowError, UpdateBlogRequest>({
    ...options,
    mutationFn: (data: UpdateBlogRequest) => {
      return updateBlog(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMUNITY.Blogs] })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
