import {
  GENERAL_ENDPOINTS,
  GetAllPropertiesQuery,
  GetAllPropertiesResponse,
  PROPERTY_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getProperties = async (params: GetAllPropertiesQuery) => {
  const response = await axiosApi.get<GetAllPropertiesResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PROPERTY}${PROPERTY_ENDPOINTS.GET_ALL}`,
    {
      params
    }
  )
  return response.data
}
