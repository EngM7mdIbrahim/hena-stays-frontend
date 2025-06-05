import {
  CountUnreadNotificationsResponse,
  GENERAL_ENDPOINTS,
  NOTIFICATIONS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getCountNotifications = async () => {
  const response = await axiosApi.get<CountUnreadNotificationsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.NOTIFICATIONS}${NOTIFICATIONS_ENDPOINTS.COUNT_UNREAD}`
  )
  return response.data
}
