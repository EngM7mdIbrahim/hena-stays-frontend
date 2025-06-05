import { createBlog } from '@apis'
import { CreateBlogRequest, CreateBlogResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type CreateBlogMutationOptions = UseMutationOptions<
  CreateBlogResponse,
  ShowError,
  CreateBlogRequest,
  unknown
>
export const useCreateBlog = (options?: CreateBlogMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateBlogRequest) => {
      return createBlog(data)
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
