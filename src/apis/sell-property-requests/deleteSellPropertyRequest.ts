import {
  DeleteRequestSellPropertyRequestParams,
  DeleteRequestSellPropertyResponse,
  GENERAL_ENDPOINTS,
  REQUEST_SELL_PROPERTIES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deleteSellPropertyRequest = async ({
  id,
  reasonDelete
}: DeleteRequestSellPropertyRequestParams & { reasonDelete: string }) => {
  const response = await axiosApi.delete<DeleteRequestSellPropertyResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.REQUEST_SELL_PROPERTY}${REQUEST_SELL_PROPERTIES_ENDPOINTS.DELETE.replace(':id', id)}`,
    {
      data: { reasonDelete }
    }
  )
  return response
}
