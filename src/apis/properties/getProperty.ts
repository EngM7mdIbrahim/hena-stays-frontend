import {
  GENERAL_ENDPOINTS,
  GetOnePropertyQuery,
  GetOnePropertyRequestParams,
  GetOnePropertyResponse,
  PROPERTY_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

export const getProperty = async (
  params: GetOnePropertyRequestParams & GetOnePropertyQuery
) => {
  const response = await axiosApi.get<GetOnePropertyResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PROPERTY}${PROPERTY_ENDPOINTS.GET_ONE.replace(':id', params.id)}`,
    {
      params: { ...params, id: undefined }
    }
  )
  return response.data
}
