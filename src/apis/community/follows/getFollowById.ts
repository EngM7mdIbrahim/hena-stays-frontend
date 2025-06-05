import {
  COMMENTS_ENDPOINTS,
  FindFollowRequest,
  FindFollowResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getFollowById = async ({ id }: FindFollowRequest) => {
  const response = await axiosApi.get<FindFollowResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.FOLLOWS}${COMMENTS_ENDPOINTS.GET_BY_ID}${id}`
  )
  return response.data
}
