import {
  BulkUpdateRecommendationsRequestBody,
  BulkUpdateRecommendationsResponse,
  GENERAL_ENDPOINTS,
  PROPERTY_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const bulkUpdateRecommendations = async (
  data: BulkUpdateRecommendationsRequestBody
) => {
  const response = await axiosApi.patch<BulkUpdateRecommendationsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PROPERTY}${PROPERTY_ENDPOINTS.BULK_UPDATE_RECOMMENDATION}`,
    data
  )
  return response.data
}
