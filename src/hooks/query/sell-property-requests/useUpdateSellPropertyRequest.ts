import { updateSellPropertyRequest } from '@apis'
import {
  UpdateRequestSellPropertyRequestBody,
  UpdateRequestSellPropertyRequestParams,
  UpdateRequestSellPropertyResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UpdateSellPropertyRequestMutationOptions = UseMutationOptions<
  UpdateRequestSellPropertyResponse,
  ShowError,
  UpdateRequestSellPropertyRequestBody & UpdateRequestSellPropertyRequestParams,
  unknown
>

export const useUpdateSellPropertyRequest = (
  options?: UpdateSellPropertyRequestMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation<
    UpdateRequestSellPropertyResponse,
    ShowError,
    UpdateRequestSellPropertyRequestBody &
      UpdateRequestSellPropertyRequestParams
  >({
    ...options,
    mutationFn: (data) => updateSellPropertyRequest(data),
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
