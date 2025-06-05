import {
  CreateRequestSellPropertyRequestBody,
  CreateRequestSellPropertyResponse,
  GENERAL_ENDPOINTS,
  REQUEST_SELL_PROPERTIES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const createSellPropertyRequest = async (
  data: CreateRequestSellPropertyRequestBody
) => {
  const response = await axiosApi.post<CreateRequestSellPropertyResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.REQUEST_SELL_PROPERTY}${REQUEST_SELL_PROPERTIES_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
