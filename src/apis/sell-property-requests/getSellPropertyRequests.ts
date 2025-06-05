import {
  GENERAL_ENDPOINTS,
  GetAllRequestSellPropertiesResponse,
  GetAllRequestSellPropertyQuery,
  REQUEST_SELL_PROPERTIES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getSellPropertyRequests = async (
  params: GetAllRequestSellPropertyQuery
) => {
  const response = await axiosApi.get<GetAllRequestSellPropertiesResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.REQUEST_SELL_PROPERTY}${REQUEST_SELL_PROPERTIES_ENDPOINTS.GET_ALL}`,
    {
      params
    }
  )
  return response.data
}
