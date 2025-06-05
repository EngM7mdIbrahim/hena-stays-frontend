import {
  DeleteFollowRequest,
  DeleteFollowResponse,
  FOLLOWS_ENDPOINTS,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deleteFollow = async (data: DeleteFollowRequest) => {
  const response = await axiosApi.delete<DeleteFollowResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.FOLLOWS}${FOLLOWS_ENDPOINTS.DELETE}`,
    { data }
  )
  return response
}
