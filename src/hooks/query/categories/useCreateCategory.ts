import { createCategory } from '@apis'
import { CreateCategoryRequest, CreateCategoryResponse } from '@commonTypes'
import {
  useMutation,
  UseMutationOptions
  // useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type createCategoryMutationOptions = UseMutationOptions<
  CreateCategoryResponse,
  ShowError,
  CreateCategoryRequest,
  unknown
>
export const useCreateCategory = (options?: createCategoryMutationOptions) => {
  // const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCategoryRequest) => {
      return createCategory(data)
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
