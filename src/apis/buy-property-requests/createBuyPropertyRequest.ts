import {
  CreateRequestBuyPropertyRequestBody,
  CreateRequestBuyPropertyResponse,
  GENERAL_ENDPOINTS,
  REQUEST_BUY_PROPERTIES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const createBuyPropertyRequest = async (
  data: CreateRequestBuyPropertyRequestBody
) => {
  const response = await axiosApi.post<CreateRequestBuyPropertyResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.REQUEST_BUY_PROPERTY}${REQUEST_BUY_PROPERTIES_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
