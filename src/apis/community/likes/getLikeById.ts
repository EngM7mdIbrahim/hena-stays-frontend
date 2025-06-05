import {
  FindLikeRequest,
  FindLikeResponse,
  GENERAL_ENDPOINTS,
  LIKES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getLikeById = async ({ id }: FindLikeRequest) => {
  const response = await axiosApi.get<FindLikeResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.LIKES}${LIKES_ENDPOINTS.GET_BY_ID}${id}`
  )
  return response.data
}
