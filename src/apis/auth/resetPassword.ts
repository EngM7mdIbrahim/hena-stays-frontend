import {
  AUTHENTICATION_ENDPOINTS,
  GENERAL_ENDPOINTS,
  ResetPasswordRequest,
  ResetPasswordResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const resetPassword = async (data: ResetPasswordRequest) => {
  const response = await axiosApi.post<ResetPasswordResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.AUTH}${AUTHENTICATION_ENDPOINTS.RESET_PASSWORD}`,
    data
  )
  return response.data
}
