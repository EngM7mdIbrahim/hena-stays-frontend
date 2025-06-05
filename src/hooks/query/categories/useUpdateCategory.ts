import { updateCategory } from '@apis'
import {
  UpdateCategoryRequest,
  UpdateCategoryRequestParams,
  UpdateCategoryResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UpdateCategoryMutationOptions = UseMutationOptions<
  UpdateCategoryResponse,
  ShowError,
  UpdateCategoryRequest & UpdateCategoryRequestParams,
  unknown
>
export const useUpdateCategory = (options?: UpdateCategoryMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<
    UpdateCategoryResponse,
    ShowError,
    UpdateCategoryRequest & UpdateCategoryRequestParams
  >({
    ...options,
    mutationFn: (data: UpdateCategoryRequest & UpdateCategoryRequestParams) => {
      return updateCategory(data)
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
