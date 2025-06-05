import {
  GENERAL_ENDPOINTS,
  GetOneNotificationParams,
  GetOneNotificationQuery,
  GetOneNotificationResponse,
  NOTIFICATIONS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getNotification = async (
  params: GetOneNotificationParams & GetOneNotificationQuery
) => {
  const response = await axiosApi.get<GetOneNotificationResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.NOTIFICATIONS}${NOTIFICATIONS_ENDPOINTS.GET_ONE.replace(':id', params.id)}`,
    {
      params: { ...params, id: undefined }
    }
  )
  return response.data
}
