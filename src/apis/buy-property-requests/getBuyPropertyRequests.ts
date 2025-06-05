import {
  GENERAL_ENDPOINTS,
  GetAllRequestBuyPropertiesResponse,
  GetAllRequestBuyPropertyQuery,
  REQUEST_BUY_PROPERTIES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getBuyPropertyRequests = async (
  params: GetAllRequestBuyPropertyQuery
) => {
  const response = await axiosApi.get<GetAllRequestBuyPropertiesResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.REQUEST_BUY_PROPERTY}${REQUEST_BUY_PROPERTIES_ENDPOINTS.GET_ALL}`,
    {
      params
    }
  )
  return response.data
}
