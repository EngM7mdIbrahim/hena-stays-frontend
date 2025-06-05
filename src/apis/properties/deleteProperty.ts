import {
  DeletePropertyRequestBody,
  DeletePropertyRequestParams,
  DeletePropertyResponse,
  GENERAL_ENDPOINTS,
  PROPERTY_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const deleteProperty = async ({
  id,
  reasonDelete
}: DeletePropertyRequestParams & DeletePropertyRequestBody) => {
  const response = await axiosApi.delete<DeletePropertyResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PROPERTY}${PROPERTY_ENDPOINTS.DELETE.replace(':id', id)}`,
    {
      data: { reasonDelete }
    }
  )
  return response
}
