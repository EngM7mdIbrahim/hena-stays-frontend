import { getSubscription } from '@apis'
import {
  GetOneSubscriptionRequestParams,
  GetOneSubscriptionResponseBody
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetSubscriptionByIdOptions = UseQueryOptions<
  GetOneSubscriptionResponseBody,
  ShowError,
  GetOneSubscriptionResponseBody
>

export const useGetSubscriptionById = (
  params: GetOneSubscriptionRequestParams,
  options?: UseGetSubscriptionByIdOptions
) => {
  return useQuery<
    GetOneSubscriptionResponseBody,
    ShowError,
    GetOneSubscriptionResponseBody
  >({
    ...options,
    queryKey: [QUERY_KEYS.SUBSCRIPTIONS.SINGLE_SUBSCRIPTION(params.id), params],
    queryFn: () => getSubscription(params),
    enabled: !!params.id
  })
}
