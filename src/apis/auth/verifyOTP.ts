import {
  AUTHENTICATION_ENDPOINTS,
  GENERAL_ENDPOINTS,
  VerifyOTPRequest,
  VerifyOTPResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const verifyOTP = async (data: VerifyOTPRequest) => {
  const response = await axiosApi.post<VerifyOTPResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.AUTH}${AUTHENTICATION_ENDPOINTS.VERIFY_OTP}`,
    data
  )
  return response.data
}
