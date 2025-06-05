import {
  GENERAL_ENDPOINTS,
  GetOneSubscriptionRequestParams,
  GetOneSubscriptionResponseBody,
  SUBSCRIPTION_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getSubscription = async (
  params: GetOneSubscriptionRequestParams
) => {
  const response = await axiosApi.get<GetOneSubscriptionResponseBody>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.SUBSCRIPTIONS}${SUBSCRIPTION_ENDPOINTS.GET_ONE.replace(
      ':id',
      params.id
    )}`
  )

  return response.data
}
