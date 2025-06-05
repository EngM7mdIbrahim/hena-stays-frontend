import { getPayments } from '@apis'
import {
  GetPaymentTransactionsRequestQuery,
  GetPaymentTransactionsResponseBody
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetPaymentsOptions = UseQueryOptions<
  GetPaymentTransactionsResponseBody,
  ShowError,
  GetPaymentTransactionsResponseBody
>

export const useGetPayments = (
  params: GetPaymentTransactionsRequestQuery,
  options?: UseGetPaymentsOptions
) => {
  return useQuery<GetPaymentTransactionsResponseBody, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.PAYMENT.CREDITS, params],
    queryFn: () => getPayments(params),
    refetchOnWindowFocus: false
  })
}
