import { getCreditsRequest } from '@apis'
import {
  GetCreditRequestParam,
  GetCreditRequestQuery,
  GetCreditRequestResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetCreditsRequestOptions = UseQueryOptions<
  GetCreditRequestResponse,
  ShowError,
  GetCreditRequestResponse
>

export const useGetCreditsRequest = (
  params: GetCreditRequestParam & GetCreditRequestQuery,
  options?: UseGetCreditsRequestOptions
) => {
  return useQuery({
    ...options,
    queryKey: [QUERY_KEYS.PAYMENT.CREDITS_REQUEST.SINGLE(params.id)],
    queryFn: () => getCreditsRequest(params),
    enabled: !!params.id,
    refetchOnWindowFocus: false
  })
}
