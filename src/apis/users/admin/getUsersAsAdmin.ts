import {
  GENERAL_ENDPOINTS,
  GetAllUsersRequestQuery,
  GetAllUsersResponse,
  USER_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getUsersAsAdmin = async (params: GetAllUsersRequestQuery) => {
  const response = await axiosApi.get<GetAllUsersResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.USERS}${USER_ENDPOINTS.GET_ALL_AS_ADMIN}`,
    {
      params
    }
  )
  return response.data
}
