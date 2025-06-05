import {
  ANALYTICS_ENDPOINTS,
  GENERAL_ENDPOINTS,
  GetAnalyticsQuery,
  GetCommunityAnalyticsResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const getCommunityAnalytics = async (params: GetAnalyticsQuery) => {
  const response = await axiosApi.get<GetCommunityAnalyticsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.ANALYTICS}${ANALYTICS_ENDPOINTS.GET_COMMUNITY}`,
    {
      params
    }
  )
  return response.data
}
