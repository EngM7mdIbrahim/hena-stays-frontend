import {
  GENERAL_ENDPOINTS,
  REQUEST_SELL_PROPERTIES_ENDPOINTS,
  UpdateRequestSellPropertyRequestBody,
  UpdateRequestSellPropertyRequestParams,
  UpdateRequestSellPropertyResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const updateSellPropertyRequest = async ({
  id,
  ...data
}: UpdateRequestSellPropertyRequestBody &
  UpdateRequestSellPropertyRequestParams) => {
  const response = await axiosApi.patch<UpdateRequestSellPropertyResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.REQUEST_SELL_PROPERTY}${REQUEST_SELL_PROPERTIES_ENDPOINTS.UPDATE.replace(':id', id)}`,
    data
  )
  return response.data
}
