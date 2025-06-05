import { searchPlaceDetails } from '@apis'
import { SearchPlaceRequestQuery, SearchPlaceResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UseSearchPlacesOptions = Omit<
  UseMutationOptions<SearchPlaceResponse, ShowError, SearchPlaceRequestQuery>,
  'mutationKey' | 'mutationFn'
>

export const useSearchPlaces = (options?: UseSearchPlacesOptions) => {
  return useMutation<SearchPlaceResponse, ShowError, SearchPlaceRequestQuery>({
    ...options,
    mutationKey: [QUERY_KEYS.GOOGLE.SEARCH_PLACES],
    mutationFn: ({ text }) => searchPlaceDetails({ text }),
    onError(err, variables, _context) {
      getError(err)
      options?.onError?.(err, variables, _context)
    }
  })
}
