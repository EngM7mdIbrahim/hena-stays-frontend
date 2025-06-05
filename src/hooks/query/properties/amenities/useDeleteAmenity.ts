import { deleteAmenity } from '@apis'
import { DeleteAmenityRequestParams, DeleteAmenityResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type DeleteAmenityMutationOptions = UseMutationOptions<
  DeleteAmenityResponse,
  ShowError,
  DeleteAmenityRequestParams,
  unknown
>
export const useDeleteAmenity = (options?: DeleteAmenityMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<
    DeleteAmenityResponse,
    ShowError,
    DeleteAmenityRequestParams
  >({
    ...options,
    mutationFn: async ({ id }: DeleteAmenityRequestParams) => {
      const response = await deleteAmenity({ id })
      return response.data
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PROPERTIES.AMENITIES]
      })
    },
    onError(err, variables, _context) {
      getError(err)
      options?.onError?.(err, variables, _context)
    }
  })
}
