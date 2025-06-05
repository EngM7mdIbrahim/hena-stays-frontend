import { getProperty } from '@apis'
import {
  GetOnePropertyQuery,
  GetOnePropertyRequestParams,
  GetOnePropertyResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetPropertyByIdOptions = UseQueryOptions<
  GetOnePropertyResponse,
  ShowError,
  GetOnePropertyResponse
>

export const useGetPropertyById = (
  params: GetOnePropertyQuery & GetOnePropertyRequestParams,
  options?: UseGetPropertyByIdOptions
) => {
  return useQuery<GetOnePropertyResponse, ShowError, GetOnePropertyResponse>({
    ...options,
    queryKey: [...QUERY_KEYS.PROPERTIES.SINGLE_PROPERTY(params.id), params],
    queryFn: () => getProperty(params),
    enabled: !!params.id
  })
}
