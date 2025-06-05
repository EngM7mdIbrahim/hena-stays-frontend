import { updateOfficialBlog } from '@apis'
import {
  UpdateOfficialBlogRequest,
  UpdateOfficialBlogResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UpdateOfficialBlogMutationOptions = UseMutationOptions<
  UpdateOfficialBlogResponse,
  ShowError,
  UpdateOfficialBlogRequest,
  unknown
>
export const useUpdateOfficialBlog = (
  options?: UpdateOfficialBlogMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation<
    UpdateOfficialBlogResponse,
    ShowError,
    UpdateOfficialBlogRequest
  >({
    ...options,
    mutationFn: (data: UpdateOfficialBlogRequest) => {
      return updateOfficialBlog(data)
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
