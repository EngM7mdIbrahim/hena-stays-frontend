import { deleteBuyPropertyRequest } from '@apis'
import { DeleteRequestBuyPropertyResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type DeleteBuyPropertyRequestMutationOptions = UseMutationOptions<
  DeleteRequestBuyPropertyResponse,
  ShowError,
  { id: string; reasonDelete: string },
  unknown
>

export const useDeleteBuyPropertyRequest = (
  options?: DeleteBuyPropertyRequestMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation<
    DeleteRequestBuyPropertyResponse,
    ShowError,
    { id: string; reasonDelete: string }
  >({
    ...options,
    mutationFn: async ({ id, reasonDelete }) => {
      const response = await deleteBuyPropertyRequest({ id, reasonDelete })
      return response.data
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BUY_PROPERTY_REQUESTS.BUY_PROPERTY_REQUESTS]
      })
    },
    onError(err, variables, _context) {
      getError(err)
      options?.onError?.(err, variables, _context)
    }
  })
}
