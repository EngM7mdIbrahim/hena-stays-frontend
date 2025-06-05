import {
  GENERAL_ENDPOINTS,
  GetDefaultSupportUserResponse,
  USER_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getDefaultSupportUser = async () => {
  const response = await axiosApi.get<GetDefaultSupportUserResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.USERS}${USER_ENDPOINTS.GET_DEFAULT_SUPPORT_USER}`
  )
  return response.data
}
