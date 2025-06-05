import {
  GENERAL_ENDPOINTS,
  GetAllSubscriptionsRequestQuery,
  GetAllSubscriptionsResponseBody,
  SUBSCRIPTION_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getSubscriptions = async (
  query: GetAllSubscriptionsRequestQuery
) => {
  const response = await axiosApi.get<GetAllSubscriptionsResponseBody>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.SUBSCRIPTIONS}${SUBSCRIPTION_ENDPOINTS.GET_ALL}`,
    {
      params: query
    }
  )

  return response.data
}
