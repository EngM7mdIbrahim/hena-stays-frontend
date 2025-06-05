import { getCallRequests } from '@apis'
import { GetAllCallRequestsResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

export type UseGetCallRequestsOptions = UseQueryOptions<
  GetAllCallRequestsResponse,
  ShowError,
  GetAllCallRequestsResponse
>

export const useGetCallRequests = (
  params: any,
  options?: Partial<UseGetCallRequestsOptions>
) => {
  return useQuery<GetAllCallRequestsResponse, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.CALL_REQUESTS.CALL_REQUESTS, params],
    queryFn: () => getCallRequests(params)
  })
}
