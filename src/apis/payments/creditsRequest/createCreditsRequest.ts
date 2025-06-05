import {
  CreateCreditRequestsBody,
  CreateCreditResponse,
  CREDITS_REQUESTS_ENDPOINTS,
  GENERAL_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const createCreditsRequest = async (data: CreateCreditRequestsBody) => {
  const response = await axiosApi.post<CreateCreditResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CREDITS_REQUESTS}${CREDITS_REQUESTS_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
