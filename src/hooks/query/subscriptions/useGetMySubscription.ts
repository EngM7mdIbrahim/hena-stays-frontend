import { getMySubscription } from '@apis'
import { GetOneSubscriptionResponseBody } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetMySubscriptionOptions = UseQueryOptions<
  GetOneSubscriptionResponseBody,
  ShowError,
  GetOneSubscriptionResponseBody
>

export const useGetMySubscription = (
  options?: Partial<UseGetMySubscriptionOptions>
) => {
  return useQuery<
    GetOneSubscriptionResponseBody,
    ShowError,
    GetOneSubscriptionResponseBody
  >({
    ...options,
    queryKey: [QUERY_KEYS.SUBSCRIPTIONS.MY_SUBSCRIPTION],
    queryFn: getMySubscription
  })
}
