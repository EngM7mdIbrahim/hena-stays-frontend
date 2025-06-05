import {
  AUTHENTICATION_ENDPOINTS,
  GENERAL_ENDPOINTS,
  RegisterRequest,
  RegisterUserResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const registerUser = async (data: RegisterRequest) => {
  const response = await axiosApi.post<RegisterUserResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.AUTH}${AUTHENTICATION_ENDPOINTS.REGISTER}`,
    data
  )
  return response.data
}
