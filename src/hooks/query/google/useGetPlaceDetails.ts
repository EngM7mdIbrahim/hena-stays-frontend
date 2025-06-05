import { getPlaceDetails } from '@apis'
import { PlaceDetailsRequestQuery, PlaceDetailsResponse } from '@commonTypes'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UseGetPlaceDetailsOptions = UseMutationOptions<
  PlaceDetailsResponse,
  ShowError,
  PlaceDetailsRequestQuery
>

export const useGetPlaceDetails = (options?: UseGetPlaceDetailsOptions) => {
  return useMutation<PlaceDetailsResponse, ShowError, PlaceDetailsRequestQuery>(
    {
      ...options,
      mutationFn: (params) => getPlaceDetails(params),
      onError(err, variables, _context) {
        getError(err)
        options?.onError?.(err, variables, _context)
      }
    }
  )
}
