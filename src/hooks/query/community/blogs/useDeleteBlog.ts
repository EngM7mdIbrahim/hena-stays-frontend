import { deleteBlog } from '@apis'
import { DeleteBlogRequestParams, DeleteBlogResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type DeleteBlogMutationOptions = UseMutationOptions<
  DeleteBlogResponse,
  ShowError,
  DeleteBlogRequestParams,
  unknown
>
export const useDeleteBlog = (options?: DeleteBlogMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<DeleteBlogResponse, ShowError, DeleteBlogRequestParams>({
    ...options,
    mutationFn: async ({ id }: DeleteBlogRequestParams) => {
      const response = await deleteBlog({ id })
      return response.data
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMUNITY.Blogs] })
    },
    onError(err, variables, _context) {
      getError(err)
      options?.onError?.(err, variables, _context)
    }
  })
}
