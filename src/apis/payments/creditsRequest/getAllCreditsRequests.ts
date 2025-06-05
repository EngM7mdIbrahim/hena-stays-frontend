import {
  CREDITS_REQUESTS_ENDPOINTS,
  GENERAL_ENDPOINTS,
  GetAllCreditRequestsQuery,
  GetAllCreditRequestsResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const getAllCreditsRequests = async (
  params: GetAllCreditRequestsQuery
) => {
  const response = await axiosApi.get<GetAllCreditRequestsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CREDITS_REQUESTS}${CREDITS_REQUESTS_ENDPOINTS.GET_ALL}`,
    {
      params
    }
  )
  return response.data
}
