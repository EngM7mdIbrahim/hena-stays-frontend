import {
  DeleteNotificationRequestParams,
  DeleteNotificationResponse,
  GENERAL_ENDPOINTS,
  NOTIFICATIONS_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deleteNotification = async (
  params: DeleteNotificationRequestParams
) => {
  const response = await axiosApi.delete<DeleteNotificationResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.NOTIFICATIONS}${NOTIFICATIONS_ENDPOINTS.DELETE_ONE.replace(':id', params.id)}`
  )
  return response.data
}
