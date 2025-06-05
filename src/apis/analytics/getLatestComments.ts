import {
  ANALYTICS_ENDPOINTS,
  GENERAL_ENDPOINTS,
  GetAnalyticsQuery,
  GetLatestCommentsResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const getLatestComments = async (params: GetAnalyticsQuery) => {
  const response = await axiosApi.get<GetLatestCommentsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.ANALYTICS}${ANALYTICS_ENDPOINTS.GET_LATEST_COMMENTS}`,
    {
      params
    }
  )
  return response.data
}
