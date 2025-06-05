import {
  GENERAL_ENDPOINTS,
  GetAllNotificationsQuery,
  GetAllNotificationsResponse,
  NOTIFICATIONS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getNotifications = async (params: GetAllNotificationsQuery) => {
  const response = await axiosApi.get<GetAllNotificationsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.NOTIFICATIONS}${NOTIFICATIONS_ENDPOINTS.GET_ALL}`,
    {
      params
    }
  )
  return response.data
}
