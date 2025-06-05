import {
  GENERAL_ENDPOINTS,
  GetAllUsersRequestQuery,
  GetAllUsersResponse,
  USER_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getUsersAsCompany = async (params: GetAllUsersRequestQuery) => {
  const response = await axiosApi.get<GetAllUsersResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.USERS}${USER_ENDPOINTS.GET_USERS_AS_COMPANY}`,
    {
      params
    }
  )
  return response.data
}
