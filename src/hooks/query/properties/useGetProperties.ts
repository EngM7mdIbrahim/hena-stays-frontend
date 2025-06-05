import { getProperties } from '@apis'
import { GetAllPropertiesQuery, GetAllPropertiesResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetPropertiesOptions = UseQueryOptions<
  GetAllPropertiesResponse,
  ShowError,
  GetAllPropertiesResponse
>

export const useGetProperties = (
  params: GetAllPropertiesQuery,
  options?: UseGetPropertiesOptions
) => {
  return useQuery<GetAllPropertiesResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.PROPERTIES.PROPERTIES, params],
    queryFn: () => getProperties(params),
    refetchOnWindowFocus: false
  })
}
