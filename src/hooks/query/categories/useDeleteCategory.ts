import { deleteCategory } from '@apis'
import { DeleteCategoryParams, DeleteCategoryResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type DeleteCategoryMutationOptions = UseMutationOptions<
  DeleteCategoryResponse,
  ShowError,
  DeleteCategoryParams,
  unknown
>
export const useDeleteCategory = (options?: DeleteCategoryMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<DeleteCategoryResponse, ShowError, DeleteCategoryParams>({
    ...options,
    mutationFn: async ({ id }: DeleteCategoryParams) => {
      const response = await deleteCategory({ id })
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
