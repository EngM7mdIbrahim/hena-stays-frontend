import {
  FindAllFollowsRequestQuery,
  FindAllFollowsResponse,
  FOLLOWS_ENDPOINTS,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getFollows = async (params: FindAllFollowsRequestQuery) => {
  const response = await axiosApi.get<FindAllFollowsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.FOLLOWS}${FOLLOWS_ENDPOINTS.READ}`,
    {
      params
    }
  )
  return response.data
}
