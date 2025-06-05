import { updateSubCategory } from '@apis'
import {
  UpdateSubCategoryRequest,
  UpdateSubCategoryRequestParams,
  UpdateSubCategoryResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UpdateSubCategoryMutationOptions = UseMutationOptions<
  UpdateSubCategoryResponse,
  ShowError,
  UpdateSubCategoryRequest & UpdateSubCategoryRequestParams,
  unknown
>
export const useUpdateSubCategory = (
  options?: UpdateSubCategoryMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation<
    UpdateSubCategoryResponse,
    ShowError,
    UpdateSubCategoryRequest & UpdateSubCategoryRequestParams
  >({
    ...options,
    mutationFn: (
      data: UpdateSubCategoryRequest & UpdateSubCategoryRequestParams
    ) => {
      return updateSubCategory(data)
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
