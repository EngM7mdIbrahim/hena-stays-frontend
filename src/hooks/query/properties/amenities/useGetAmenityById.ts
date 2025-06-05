import { getAmenity } from '@apis'
import { GetAmenityRequestParams, GetAmenityResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetAmenityByIdOptions = UseQueryOptions<
  GetAmenityResponse,
  ShowError,
  GetAmenityResponse
>

export const useGetAmenityById = (
  params: GetAmenityRequestParams,
  options?: UseGetAmenityByIdOptions
) => {
  return useQuery<GetAmenityResponse, ShowError, GetAmenityResponse>({
    ...options,
    queryKey: [QUERY_KEYS.PROPERTIES.AMENITIES, params],
    queryFn: () => getAmenity(params),
    enabled: !!params.id
  })
}
