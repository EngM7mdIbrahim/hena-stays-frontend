import {
  GENERAL_ENDPOINTS,
  SUBSCRIPTION_ENDPOINTS,
  UpdateSubscriptionRequestBody,
  UpdateSubscriptionRequestParams,
  UpdateSubscriptionResponseBody
} from '@commonTypes'
import { axiosApi } from '@config'

export const updateSubscription = async (
  data: UpdateSubscriptionRequestParams & UpdateSubscriptionRequestBody
) => {
  const response = await axiosApi.patch<UpdateSubscriptionResponseBody>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.SUBSCRIPTIONS}${SUBSCRIPTION_ENDPOINTS.UPDATE.replace(
      ':id',
      data.id
    )}`,
    data
  )

  return response.data
}
