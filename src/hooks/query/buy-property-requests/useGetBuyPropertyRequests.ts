import { getBuyPropertyRequests } from '@apis'
import {
  GetAllRequestBuyPropertiesResponse,
  GetAllRequestBuyPropertyQuery
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

export type UseGetBuyPropertyRequestsOptions = UseQueryOptions<
  GetAllRequestBuyPropertiesResponse,
  ShowError,
  GetAllRequestBuyPropertiesResponse
>

export const useGetBuyPropertyRequests = (
  params: GetAllRequestBuyPropertyQuery,
  options?: Partial<UseGetBuyPropertyRequestsOptions>
) => {
  return useQuery<GetAllRequestBuyPropertiesResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.BUY_PROPERTY_REQUESTS.BUY_PROPERTY_REQUESTS, params],
    queryFn: () => getBuyPropertyRequests(params)
  })
}
