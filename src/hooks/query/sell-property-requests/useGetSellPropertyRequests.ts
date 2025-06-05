import { getSellPropertyRequests } from '@apis'
import {
  GetAllRequestSellPropertiesResponse,
  GetAllRequestSellPropertyQuery
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

export type UseGetSellPropertyRequestsOptions = UseQueryOptions<
  GetAllRequestSellPropertiesResponse,
  ShowError,
  GetAllRequestSellPropertiesResponse
>

export const useGetSellPropertyRequests = (
  params: GetAllRequestSellPropertyQuery,
  options?: Partial<UseGetSellPropertyRequestsOptions>
) => {
  return useQuery<GetAllRequestSellPropertiesResponse, ShowError>({
    ...options,
    queryKey: [
      QUERY_KEYS.SELL_PROPERTY_REQUESTS.SELL_PROPERTY_REQUESTS,
      params
    ],
    queryFn: () => getSellPropertyRequests(params)
  })
}
