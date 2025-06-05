import {
  DeleteLikeRequest,
  DeleteLikeResponse,
  GENERAL_ENDPOINTS,
  LIKES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deleteLike = async (data: DeleteLikeRequest) => {
  const response = await axiosApi.delete<DeleteLikeResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.LIKES}${LIKES_ENDPOINTS.DELETE}`,
    {
      data
    }
  )
  return response
}
