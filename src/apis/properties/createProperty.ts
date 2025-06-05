import {
  CreatePropertyRequestBody,
  CreatePropertyResponse,
  GENERAL_ENDPOINTS,
  PROPERTY_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const createProperty = async (data: CreatePropertyRequestBody) => {
  const response = await axiosApi.post<CreatePropertyResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PROPERTY}${PROPERTY_ENDPOINTS.CREATE}`,
    data
  )
  return response.data
}
