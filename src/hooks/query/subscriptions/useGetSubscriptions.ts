import { getSubscriptions } from '@apis'
import {
  GetAllSubscriptionsRequestQuery,
  GetAllSubscriptionsResponseBody
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseGetSubscriptionsOptions = UseQueryOptions<
  GetAllSubscriptionsResponseBody,
  ShowError,
  GetAllSubscriptionsResponseBody
>

export const useGetSubscriptions = (
  params: GetAllSubscriptionsRequestQuery,
  options?: UseGetSubscriptionsOptions
) => {
  return useQuery<GetAllSubscriptionsResponseBody, ShowError>({
    ...options,
    queryKey: [QUERY_KEYS.SUBSCRIPTIONS.SUBSCRIPTIONS, params],
    queryFn: () => getSubscriptions(params),
    refetchOnWindowFocus: false
  })
}
