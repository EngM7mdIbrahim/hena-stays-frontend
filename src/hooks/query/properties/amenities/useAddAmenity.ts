import { addAmenity } from '@apis'
import { AddAmenityRequest, AddAmenityResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type addAmenityMutationOptions = UseMutationOptions<
  AddAmenityResponse,
  ShowError,
  AddAmenityRequest,
  unknown
>
export const useAddAmenity = (options?: addAmenityMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AddAmenityRequest) => {
      return addAmenity(data)
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
