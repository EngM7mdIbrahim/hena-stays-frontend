import {
  AUTHENTICATION_ENDPOINTS,
  GENERAL_ENDPOINTS,
  LoginAsRequest,
  LoginAsResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const loginAs = async (data: LoginAsRequest) => {
  const response = await axiosApi.post<LoginAsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.AUTH}${AUTHENTICATION_ENDPOINTS.LOG_IN_AS}`,
    data
  )
  return response.data
}
