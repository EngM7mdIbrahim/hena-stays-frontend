import { createProperty } from '@apis'
import { CreatePropertyRequestBody, CreatePropertyResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type createPropertyMutationOptions = UseMutationOptions<
  CreatePropertyResponse,
  ShowError,
  CreatePropertyRequestBody,
  unknown
>
export const useCreateProperty = (options?: createPropertyMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePropertyRequestBody) => {
      return createProperty(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PROPERTIES.PROPERTIES]
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
