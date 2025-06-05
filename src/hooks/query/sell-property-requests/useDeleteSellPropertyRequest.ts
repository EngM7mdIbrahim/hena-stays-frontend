import { deleteSellPropertyRequest } from '@apis'
import {
  DeleteRequestSellPropertyRequestParams,
  DeleteRequestSellPropertyResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type DeleteSellPropertyRequestMutationOptions = UseMutationOptions<
  DeleteRequestSellPropertyResponse,
  ShowError,
  DeleteRequestSellPropertyRequestParams & { reasonDelete: string },
  unknown
>

export const useDeleteSellPropertyRequest = (
  options?: DeleteSellPropertyRequestMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation<
    DeleteRequestSellPropertyResponse,
    ShowError,
    DeleteRequestSellPropertyRequestParams & { reasonDelete: string }
  >({
    ...options,
    mutationFn: async ({ id, reasonDelete }) => {
      const response = await deleteSellPropertyRequest({ id, reasonDelete })
      return response.data
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELL_PROPERTY_REQUESTS.SELL_PROPERTY_REQUESTS]
      })
    },
    onError(err, variables, _context) {
      getError(err)
      options?.onError?.(err, variables, _context)
    }
  })
}
