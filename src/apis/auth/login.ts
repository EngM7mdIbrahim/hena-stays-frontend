import {
  AUTHENTICATION_ENDPOINTS,
  GENERAL_ENDPOINTS,
  LoginRequest,
  LoginResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const login = async (data: LoginRequest) => {
  const response = await axiosApi.post<LoginResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.AUTH}${AUTHENTICATION_ENDPOINTS.LOGIN}`,
    data
  )
  return response.data
}
