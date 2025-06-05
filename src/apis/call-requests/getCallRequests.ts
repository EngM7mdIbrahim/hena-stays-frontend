import {
  CALL_REQUEST_ENDPOINTS,
  GENERAL_ENDPOINTS,
  GetAllCallRequestsQuery,
  GetAllCallRequestsResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const getCallRequests = async (params: GetAllCallRequestsQuery) => {
  const response = await axiosApi.get<GetAllCallRequestsResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.CALL_REQUESTS}${CALL_REQUEST_ENDPOINTS.GET_ALL}`,
    {
      params
    }
  )
  return response.data
}
