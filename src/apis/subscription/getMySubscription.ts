import {
  GENERAL_ENDPOINTS,
  GetOneSubscriptionResponseBody,
  SUBSCRIPTION_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getMySubscription = async () => {
  const response = await axiosApi.get<GetOneSubscriptionResponseBody>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.SUBSCRIPTIONS}${SUBSCRIPTION_ENDPOINTS.GET_MINE}`
  )

  return response.data
}
