import {
  DeleteRequestBuyPropertyRequestParams,
  DeleteRequestBuyPropertyResponse,
  GENERAL_ENDPOINTS,
  REQUEST_BUY_PROPERTIES_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deleteBuyPropertyRequest = async ({
  id,
  reasonDelete
}: DeleteRequestBuyPropertyRequestParams & { reasonDelete: string }) => {
  const response = await axiosApi.delete<DeleteRequestBuyPropertyResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.REQUEST_BUY_PROPERTY}${REQUEST_BUY_PROPERTIES_ENDPOINTS.DELETE.replace(':id', id)}`,
    {
      data: { reasonDelete }
    }
  )
  return response
}
