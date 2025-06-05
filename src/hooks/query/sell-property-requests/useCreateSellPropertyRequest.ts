import { createSellPropertyRequest } from '@apis'
import {
  CreateRequestSellPropertyRequestBody,
  CreateRequestSellPropertyResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type CreateSellPropertyRequestMutationOptions = UseMutationOptions<
  CreateRequestSellPropertyResponse,
  ShowError,
  CreateRequestSellPropertyRequestBody,
  unknown
>

export const useCreateSellPropertyRequest = (
  options?: CreateSellPropertyRequestMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateRequestSellPropertyRequestBody) => {
      return createSellPropertyRequest(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELL_PROPERTY_REQUESTS.SELL_PROPERTY_REQUESTS]
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
