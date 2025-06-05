import {
  GENERAL_ENDPOINTS,
  GetOneUserResponse,
  USER_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getMe = async () => {
  const response = await axiosApi.get<GetOneUserResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.USERS}${USER_ENDPOINTS.GET_ME}`
  )
  return response.data
}
