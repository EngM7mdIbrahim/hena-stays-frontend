import {
  AUTHENTICATION_ENDPOINTS,
  GENERAL_ENDPOINTS,
  SendOTPRequest,
  SendOTPResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const sendOTP = async (data: SendOTPRequest) => {
  const response = await axiosApi.post<SendOTPResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.AUTH}${AUTHENTICATION_ENDPOINTS.SEND_OTP}`,
    data
  )
  return response.data
}
