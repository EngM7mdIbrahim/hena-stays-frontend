import {
  AUTHENTICATION_ENDPOINTS,
  GENERAL_ENDPOINTS,
  LogoutRequestBody,
  LogoutResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const logout = async (data: LogoutRequestBody) => {
  const response = await axiosApi.post<LogoutResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.AUTH}${AUTHENTICATION_ENDPOINTS.LOGOUT}`,
    data
  )
  return response.data
}
