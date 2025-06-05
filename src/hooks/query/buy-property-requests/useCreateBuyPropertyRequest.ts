import { createBuyPropertyRequest } from '@apis'
import {
  CreateRequestBuyPropertyRequestBody,
  CreateRequestBuyPropertyResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type createBuyPropertyRequestMutationOptions = UseMutationOptions<
  CreateRequestBuyPropertyResponse,
  ShowError,
  CreateRequestBuyPropertyRequestBody,
  unknown
>
export const useCreateBuyPropertyRequest = (
  options?: createBuyPropertyRequestMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateRequestBuyPropertyRequestBody) => {
      return createBuyPropertyRequest(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BUY_PROPERTY_REQUESTS.BUY_PROPERTY_REQUESTS]
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
