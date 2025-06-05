import { createOfficialBlog } from '@apis'
import {
  CreateOfficialBlogRequest,
  CreateOfficialBlogResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type CreateOfficialBlogMutationOptions = UseMutationOptions<
  CreateOfficialBlogResponse,
  ShowError,
  CreateOfficialBlogRequest,
  unknown
>
export const useCreateOfficialBlog = (
  options?: CreateOfficialBlogMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateOfficialBlogRequest) => {
      return createOfficialBlog(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.OFFICIAL_BLOGS.OFFICIAL_BLOGS]
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
