import { deleteOfficialBlog } from '@apis'
import {
  DeleteOfficialBlogRequest,
  DeleteOfficialBlogResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type DeleteOfficialBlogMutationOptions = UseMutationOptions<
  DeleteOfficialBlogResponse,
  ShowError,
  DeleteOfficialBlogRequest,
  unknown
>
export const useDeleteOfficialBlog = (
  options?: DeleteOfficialBlogMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation<
    DeleteOfficialBlogResponse,
    ShowError,
    DeleteOfficialBlogRequest
  >({
    ...options,
    mutationFn: async ({ id }: DeleteOfficialBlogRequest) => {
      const response = await deleteOfficialBlog({ id })
      return response.data
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.OFFICIAL_BLOGS.OFFICIAL_BLOGS]
      })
    },
    onError(err, variables, _context) {
      getError(err)
      options?.onError?.(err, variables, _context)
    }
  })
}
