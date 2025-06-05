import {
  ANALYTICS_ENDPOINTS,
  GENERAL_ENDPOINTS,
  GetAnalyticsQuery,
  GetPropertiesAnalyticsResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const getPropertiesAnalytics = async (params: GetAnalyticsQuery) => {
  const response = await axiosApi.get<GetPropertiesAnalyticsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.ANALYTICS}${ANALYTICS_ENDPOINTS.GET_PROPERTIES}`,
    {
      params
    }
  )
  return response.data
}
