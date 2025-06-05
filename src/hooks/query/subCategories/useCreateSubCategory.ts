import { createSubCategory } from '@apis'
import {
  CreateSubCategoryRequest,
  CreateSubCategoryResponse
} from '@commonTypes'
import {
  useMutation,
  UseMutationOptions
  // useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type createSubCategoryMutationOptions = UseMutationOptions<
  CreateSubCategoryResponse,
  ShowError,
  CreateSubCategoryRequest,
  unknown
>
export const useCreateSubCategory = (
  options?: createSubCategoryMutationOptions
) => {
  // const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateSubCategoryRequest) => {
      return createSubCategory(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
