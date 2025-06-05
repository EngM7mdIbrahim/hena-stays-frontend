import {
  CALL_REQUEST_ENDPOINTS,
  CreateCallRequestRequest,
  CreateCallRequestResponse,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const createCallRequest = async (data: CreateCallRequestRequest) => {
  const response = await axiosApi.post<CreateCallRequestResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CALL_REQUESTS}${CALL_REQUEST_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
