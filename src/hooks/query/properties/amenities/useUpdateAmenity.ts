import { updateAmenity } from '@apis'
import { UpdateAmenityRequestParams, UpdateAmenityResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UpdateAmenityMutationOptions = UseMutationOptions<
  UpdateAmenityResponse,
  ShowError,
  UpdateAmenityRequestParams,
  unknown
>
export const useUpdateAmenity = (options?: UpdateAmenityMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<
    UpdateAmenityResponse,
    ShowError,
    UpdateAmenityRequestParams
  >({
    ...options,
    mutationFn: (data: UpdateAmenityRequestParams) => {
      return updateAmenity(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PROPERTIES.AMENITIES]
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
