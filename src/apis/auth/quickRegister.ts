import {
  AUTHENTICATION_ENDPOINTS,
  GENERAL_ENDPOINTS,
  QuickGuestRegisterRequest,
  QuickGuestRegisterResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const quickRegister = async (data: QuickGuestRegisterRequest) => {
  const response = await axiosApi.post<QuickGuestRegisterResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.AUTH}${AUTHENTICATION_ENDPOINTS.QUICK_GUEST_REGISTER}`,
    data
  )
  return response.data
}
