import {
  FindAllLikesResponse,
  GENERAL_ENDPOINTS,
  LIKES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getLikes = async (params: {}) => {
  const response = await axiosApi.get<FindAllLikesResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.LIKES}${LIKES_ENDPOINTS.READ}`,
    { params }
  )
  return response.data
}
