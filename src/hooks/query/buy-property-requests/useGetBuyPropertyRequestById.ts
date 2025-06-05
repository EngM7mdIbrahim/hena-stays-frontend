import { getOneBuyPropertyRequest } from '@apis'
import {
  GetOneRequestBuyPropertyQuery,
  GetOneRequestBuyPropertyRequestParams,
  GetOneRequestBuyPropertyResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type UseGetPropertyByIdOptions = UseQueryOptions<
  GetOneRequestBuyPropertyResponse,
  Error,
  GetOneRequestBuyPropertyResponse
>

export const useGetBuyPropertyRequestById = (
  params: GetOneRequestBuyPropertyQuery & GetOneRequestBuyPropertyRequestParams,
  options?: UseGetPropertyByIdOptions
) => {
  return useQuery<GetOneRequestBuyPropertyResponse, Error>({
    ...options,
    queryKey: [QUERY_KEYS.BUY_PROPERTY_REQUESTS.BUY_PROPERTY_REQUESTS, params],
    queryFn: () => getOneBuyPropertyRequest(params),
    enabled: !!params.id
  })
}
