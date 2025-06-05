import {
  ANALYTICS_ENDPOINTS,
  GENERAL_ENDPOINTS,
  GetUserAnalyticsResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const getUsersAnalytics = async () => {
  const response = await axiosApi.get<GetUserAnalyticsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.ANALYTICS}${ANALYTICS_ENDPOINTS.GET_USERS}`
  )
  return response.data
}
