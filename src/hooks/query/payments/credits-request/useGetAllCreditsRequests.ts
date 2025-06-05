import { getAllCreditsRequests } from '@apis'
import {
  GetAllCreditRequestsQuery,
  GetAllCreditRequestsResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetAllCreditsRequestsOptions = UseQueryOptions<
  GetAllCreditRequestsResponse,
  ShowError,
  GetAllCreditRequestsResponse
>

export const useGetAllCreditsRequests = (
  params: GetAllCreditRequestsQuery,
  options?: UseGetAllCreditsRequestsOptions
) => {
  return useQuery({
    ...options,
    queryKey: [QUERY_KEYS.PAYMENT.CREDITS_REQUEST.ALL, params],
    queryFn: () => getAllCreditsRequests(params),
    refetchOnWindowFocus: false
  })
}
