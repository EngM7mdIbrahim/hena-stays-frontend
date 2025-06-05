import {
  CreateLikeRequest,
  CreateLikeResponse,
  GENERAL_ENDPOINTS,
  LIKES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const createLike = async (data: CreateLikeRequest) => {
  const response = await axiosApi.post<CreateLikeResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.LIKES}${LIKES_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
