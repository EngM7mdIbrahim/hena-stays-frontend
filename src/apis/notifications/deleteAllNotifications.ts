import {
  DeleteAllNotificationsResponse,
  GENERAL_ENDPOINTS,
  NOTIFICATIONS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deleteAllNotifications = async () => {
  const response = await axiosApi.delete<DeleteAllNotificationsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.NOTIFICATIONS}${NOTIFICATIONS_ENDPOINTS.DELETE_ALL}`
  )
  return response.data
}
