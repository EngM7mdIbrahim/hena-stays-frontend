import {
  GENERAL_ENDPOINTS,
  PROPERTY_ENDPOINTS,
  UpdatePropertyRequestBody,
  UpdatePropertyRequestParams,
  UpdatePropertyResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const updateProperty = async ({
  id,
  ...data
}: UpdatePropertyRequestBody & UpdatePropertyRequestParams) => {
  const response = await axiosApi.patch<UpdatePropertyResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PROPERTY}${PROPERTY_ENDPOINTS.UPDATE.replace(':id', id)}`,
    data
  )
  return response.data
}
