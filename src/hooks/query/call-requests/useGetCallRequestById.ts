import { getOneCallRequest } from '@apis'
import {
  GetOneCallRequestRequestParams,
  GetOneCallRequestResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type UseGetCallRequestByIdOptions = UseQueryOptions<
  GetOneCallRequestResponse,
  Error,
  GetOneCallRequestResponse
>

export const useGetCallRequestById = (
  params: GetOneCallRequestRequestParams,
  options?: UseGetCallRequestByIdOptions
) => {
  return useQuery<GetOneCallRequestResponse, Error>({
    ...options,
    queryKey: [QUERY_KEYS.CALL_REQUESTS.CALL_REQUESTS, params],
    queryFn: () => getOneCallRequest(params),
    enabled: !!params.id
  })
}
