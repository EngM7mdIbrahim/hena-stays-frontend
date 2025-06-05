import {
  AUTHENTICATION_ENDPOINTS,
  ForgetPasswordRequest,
  ForgetPasswordResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const forgetPassword = async (data: ForgetPasswordRequest) => {
  const response = await axiosApi.post<ForgetPasswordResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.AUTH}${AUTHENTICATION_ENDPOINTS.FORGET_PASSWORD}`,
    data
  )
  return response.data
}
