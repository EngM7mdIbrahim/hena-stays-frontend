import {
  GENERAL_ENDPOINTS,
  GetUserCommunityRequestQuery,
  GetUserCommunityResponse,
  USER_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getAllUsers = async (params: GetUserCommunityRequestQuery) => {
  const response = await axiosApi.get<GetUserCommunityResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.USERS}${USER_ENDPOINTS.GET_ALL_COMMUNITY}`,
    {
      params
    }
  )
  return response.data
}
