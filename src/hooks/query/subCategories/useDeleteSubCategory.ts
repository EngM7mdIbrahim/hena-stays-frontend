import { deleteSubCategory } from '@apis'
import {
  DeleteSubCategoryRequestParams,
  DeleteSubCategoryResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type DeleteSubCategoryMutationOptions = UseMutationOptions<
  DeleteSubCategoryResponse,
  ShowError,
  DeleteSubCategoryRequestParams,
  unknown
>
export const useDeleteSubCategory = (
  options?: DeleteSubCategoryMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation<
    DeleteSubCategoryResponse,
    ShowError,
    DeleteSubCategoryRequestParams
  >({
    ...options,
    mutationFn: async ({ id }: DeleteSubCategoryRequestParams) => {
      const response = await deleteSubCategory({ id })
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
