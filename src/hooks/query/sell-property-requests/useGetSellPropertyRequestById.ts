import { getOneSellPropertyRequest } from '@apis'
import {
  GetOneRequestSellPropertyQuery,
  GetOneRequestSellPropertyRequestParams,
  GetOneRequestSellPropertyResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type UseGetSellPropertyRequestByIdOptions = UseQueryOptions<
  GetOneRequestSellPropertyResponse,
  Error,
  GetOneRequestSellPropertyResponse
>

export const useGetSellPropertyRequestById = (
  params: GetOneRequestSellPropertyQuery &
    GetOneRequestSellPropertyRequestParams,
  options?: UseGetSellPropertyRequestByIdOptions
) => {
  return useQuery<GetOneRequestSellPropertyResponse, Error>({
    ...options,
    queryKey: [
      QUERY_KEYS.SELL_PROPERTY_REQUESTS.SELL_PROPERTY_REQUESTS,
      params
    ],
    queryFn: () => getOneSellPropertyRequest(params),
    enabled: !!params.id
  })
}
