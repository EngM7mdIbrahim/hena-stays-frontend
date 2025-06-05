import {
  CreateFollowRequest,
  CreateFollowResponse,
  FOLLOWS_ENDPOINTS,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const createFollow = async (data: CreateFollowRequest) => {
  const response = await axiosApi.post<CreateFollowResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.FOLLOWS}${FOLLOWS_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
