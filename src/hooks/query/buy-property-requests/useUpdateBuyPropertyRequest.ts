import { updateBuyPropertyRequest } from '@apis'
import {
  UpdateRequestBuyPropertyRequestBody,
  UpdateRequestBuyPropertyRequestParams,
  UpdateRequestBuyPropertyResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UpdateBuyPropertyRequestMutationOptions = UseMutationOptions<
  UpdateRequestBuyPropertyResponse,
  ShowError,
  UpdateRequestBuyPropertyRequestBody & UpdateRequestBuyPropertyRequestParams,
  unknown
>
export const useUpdateBuyPropertyRequest = (
  options?: UpdateBuyPropertyRequestMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation<
    UpdateRequestBuyPropertyResponse,
    ShowError,
    UpdateRequestBuyPropertyRequestBody & UpdateRequestBuyPropertyRequestParams
  >({
    ...options,
    mutationFn: (
      data: UpdateRequestBuyPropertyRequestBody &
        UpdateRequestBuyPropertyRequestParams
    ) => {
      return updateBuyPropertyRequest(data)
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
