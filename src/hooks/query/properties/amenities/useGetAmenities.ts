import { getAmenities } from '@apis'
import { FindAllAmenitiesResponse, GetAllPropertiesQuery } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetAmenitiesOptions = UseQueryOptions<
  FindAllAmenitiesResponse,
  ShowError,
  FindAllAmenitiesResponse
>

export const useGetAmenities = (
  params: GetAllPropertiesQuery,
  options?: UseGetAmenitiesOptions
) => {
  return useQuery<FindAllAmenitiesResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.PROPERTIES.AMENITIES, params],
    queryFn: () => getAmenities(params)
  })
}
